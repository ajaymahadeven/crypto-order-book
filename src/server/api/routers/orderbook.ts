import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { wsManager } from '~/server/trpc/websocket-manager';
import { OrderBookSchema } from '~/types/schemas/OrderBookSchema';
import { TokenSchema } from '~/types/schemas/Token';

/**
 * This is a tRPC (TypeScript-RPC) router that handles the order book data for a cryptocurrency exchange.
 * It provides three main functionalities:
 * 1. Fetching the latest order book data from the WebSocket Manager (in-memory, super fast!)
 * 2. Retrieving the 10 most recent order book data entries from the database.
 * 3. Retrieving the 10 most recent order book data entries for a specific token from the database.
 */

export const orderBookRouter = createTRPCRouter({
    /**
     * Fetches the latest order book data from the WebSocket Manager and stores it in the database.
     * Now uses the persistent WebSocket connection instead of creating a new one each time.
     * @param ctx - The tRPC context, which provides access to the database.
     * @returns An array containing all the latest order book data for all coins.
     */
    getOrderBook: publicProcedure.query(async ({ ctx }) => {
        // Get ALL latest data from the manager (from memory - super fast!)
        const allData = wsManager.getAllLatestData();

        // If we have data, save it to database
        if (allData.length > 0) {
            // Save each coin's latest data
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
            console.log('Data stored in the db successfully');
        }

        return allData;
    }),

    /**
     * Retrieves the 10 most recent order book data entries from the database.
     * @param ctx - The tRPC context, which provides access to the database.
     * @returns An array of the 10 most recent order book data entries.
     */
    getStorageOrderBookData: publicProcedure.query(async ({ ctx }) => {
        const orderBookData = await ctx.db.orderBookData.findMany({
            orderBy: {
                timestamp: 'desc',
            },
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

        const formattedOrderBookData = orderBookData.map((item) => ({
            id: item.id,
            timestamp: item.timestamp,
            exchange: item.exchange,
            coin: item.coin,
            asks: typeof item.asks === 'string' ? JSON.parse(item.asks) : [],
            bids: typeof item.bids === 'string' ? JSON.parse(item.bids) : [],
        }));

        return formattedOrderBookData;
    }),

    /**
     * Retrieves the 10 most recent order book data entries for a specific token from the database.
     * @param input - The token for which to retrieve the order book data.
     * @param ctx - The tRPC context, which provides access to the database.
     * @returns An array of the 10 most recent order book data entries for the specified token.
     */

    getOrderBookDataByToken: publicProcedure
        .input(TokenSchema)
        .query(async ({ input, ctx }) => {
            const orderBookData = await ctx.db.orderBookData.findMany({
                where: {
                    coin: input.token,
                },
                orderBy: {
                    timestamp: 'desc',
                },
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

            const formattedOrderBookData = orderBookData.map((item) => ({
                id: item.id,
                timestamp: item.timestamp,
                exchange: item.exchange,
                coin: item.coin,
                asks:
                    typeof item.asks === 'string' ? JSON.parse(item.asks) : [],
                bids:
                    typeof item.bids === 'string' ? JSON.parse(item.bids) : [],
            }));

            return formattedOrderBookData;
        }),
});
