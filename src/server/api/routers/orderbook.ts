import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { wsManager } from '~/server/trpc/websocket-manager';
import { OrderBookSchema } from '~/types/schemas/OrderBookSchema';
import { TokenSchema } from '~/types/schemas/Token';

const COIN_SUBREDDIT: Record<string, string> = {
    'BTC/USD': 'Bitcoin',
    'ETH/USD': 'ethereum',
    'XRP/USD': 'Ripple',
    'LTC/USD': 'litecoin',
    'DOGE/USD': 'dogecoin',
};

interface RedditPost {
    data: {
        id: string;
        title: string;
        selftext: string;
        url: string;
        permalink: string;
        author: string;
        created_utc: number;
        score: number;
        is_self: boolean;
    };
}

interface RedditResponse {
    data: { children: RedditPost[] };
}

export const orderBookRouter = createTRPCRouter({
    getOrderBook: publicProcedure.query(async ({ ctx }) => {
        const allData = wsManager.getAllLatestData();

        if (allData.length > 0) {
            for (const data of allData) {
                try {
                    const validatedData = OrderBookSchema.parse(data);
                    await ctx.db.orderBookData.create({
                        data: {
                            exchange: validatedData.exchange,
                            coin: validatedData.coin,
                            timestamp: validatedData.timestamp,
                            bids: JSON.stringify(validatedData.bids),
                            asks: JSON.stringify(validatedData.asks),
                        },
                    });
                } catch (error) {
                    console.error(`Error saving ${data.coin}:`, error);
                }
            }
        }

        return allData;
    }),

    getStorageOrderBookData: publicProcedure.query(async ({ ctx }) => {
        const orderBookData = await ctx.db.orderBookData.findMany({
            orderBy: { timestamp: 'desc' },
            select: {
                id: true,
                timestamp: true,
                exchange: true,
                coin: true,
                asks: true,
                bids: true,
            },
            take: 10,
        });

        return orderBookData.map((item) => ({
            id: item.id,
            timestamp: item.timestamp,
            exchange: item.exchange,
            coin: item.coin,
            asks: typeof item.asks === 'string' ? JSON.parse(item.asks) : [],
            bids: typeof item.bids === 'string' ? JSON.parse(item.bids) : [],
        }));
    }),

    getOrderBookDataByToken: publicProcedure
        .input(TokenSchema)
        .query(async ({ input, ctx }) => {
            const orderBookData = await ctx.db.orderBookData.findMany({
                where: { coin: input.token },
                orderBy: { timestamp: 'desc' },
                select: {
                    id: true,
                    timestamp: true,
                    exchange: true,
                    coin: true,
                    asks: true,
                    bids: true,
                },
                take: 10,
            });

            return orderBookData.map((item) => ({
                id: item.id,
                timestamp: item.timestamp,
                exchange: item.exchange,
                coin: item.coin,
                asks:
                    typeof item.asks === 'string' ? JSON.parse(item.asks) : [],
                bids:
                    typeof item.bids === 'string' ? JSON.parse(item.bids) : [],
            }));
        }),

    getDailyStats: publicProcedure
        .input(z.object({ coin: z.string() }))
        .query(async ({ input, ctx }) => {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const records = await ctx.db.orderBookData.findMany({
                where: {
                    coin: input.coin,
                    createdAt: { gte: startOfDay },
                },
                select: { bids: true, asks: true, timestamp: true },
                orderBy: { timestamp: 'desc' },
            });

            if (records.length === 0) return null;

            let maxBid = -Infinity,
                minBid = Infinity;
            let maxAsk = -Infinity,
                minAsk = Infinity;

            for (const record of records) {
                const bids =
                    typeof record.bids === 'string'
                        ? (JSON.parse(record.bids) as [number, number][])
                        : [];
                const asks =
                    typeof record.asks === 'string'
                        ? (JSON.parse(record.asks) as [number, number][])
                        : [];

                const bestBid = bids[0]?.[1] ?? 0;
                const bestAsk = asks[0]?.[1] ?? 0;

                if (bestBid > maxBid) maxBid = bestBid;
                if (bestBid < minBid) minBid = bestBid;
                if (bestAsk > maxAsk) maxAsk = bestAsk;
                if (bestAsk < minAsk) minAsk = bestAsk;
            }

            const latest = records[0];
            const latestBids =
                typeof latest?.bids === 'string'
                    ? (JSON.parse(latest.bids) as [number, number][])
                    : [];
            const latestAsks =
                typeof latest?.asks === 'string'
                    ? (JSON.parse(latest.asks) as [number, number][])
                    : [];

            const currentBid = latestBids[0]?.[1] ?? 0;
            const currentAsk = latestAsks[0]?.[1] ?? 0;
            const spread =
                currentAsk > 0
                    ? (((currentAsk - currentBid) / currentAsk) * 100).toFixed(
                          4,
                      )
                    : '0';

            return {
                maxBid: maxBid === -Infinity ? null : maxBid,
                minBid: minBid === Infinity ? null : minBid,
                maxAsk: maxAsk === -Infinity ? null : maxAsk,
                minAsk: minAsk === Infinity ? null : minAsk,
                currentBid,
                currentAsk,
                spreadPct: spread,
                snapshots: records.length,
            };
        }),

    getCoinNews: publicProcedure
        .input(z.object({ coin: z.string() }))
        .query(async ({ input }) => {
            const subreddit = COIN_SUBREDDIT[input.coin];
            if (!subreddit) return [];

            try {
                const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=6&raw_json=1`;
                const res = await fetch(url, {
                    headers: { 'User-Agent': 'crypto-order-book/2.0' },
                    next: { revalidate: 300 },
                });
                if (!res.ok) return [];

                const json = (await res.json()) as RedditResponse;
                const posts = json.data?.children ?? [];

                return posts.map((p) => ({
                    id: p.data.id,
                    title: p.data.title,
                    source: `r/${subreddit}`,
                    body: p.data.is_self ? p.data.selftext.slice(0, 200) : '',
                    url: p.data.is_self
                        ? `https://reddit.com${p.data.permalink}`
                        : p.data.url,
                    publishedOn: Math.floor(p.data.created_utc),
                    score: p.data.score,
                    author: p.data.author,
                }));
            } catch {
                return [];
            }
        }),
});
