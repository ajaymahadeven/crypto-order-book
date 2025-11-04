import { NextResponse } from 'next/server';

import { db } from '~/server/db';

// This tells Vercel this can run for up to 60 seconds
export const maxDuration = 60;

// Only allow Vercel Cron to call this (security)
export async function GET(request: Request) {
    // Verify request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        console.log('⏰ Cron job started - fetching order book data...');

        // Import the fetcher function
        const { fetchOrderBookData } = await import(
            '~/server/trpc/websocket-fetcher'
        );
        const { OrderBookSchema } = await import(
            '~/types/schemas/OrderBookSchema'
        );

        // Fetch fresh data from WebSocket
        const allData = await fetchOrderBookData();

        // Save to database
        let savedCount = 0;
        for (const data of allData) {
            try {
                const validatedData = OrderBookSchema.parse(data);

                await db.orderBookData.create({
                    data: {
                        exchange: validatedData.exchange,
                        coin: validatedData.coin,
                        timestamp: validatedData.timestamp,
                        bids: JSON.stringify(validatedData.bids),
                        asks: JSON.stringify(validatedData.asks),
                    },
                });
                savedCount++;
            } catch (error) {
                console.error(`Error saving ${data.coin}:`, error);
            }
        }

        console.log(
            `✅ Cron completed - saved ${savedCount}/${allData.length} coins`,
        );

        return NextResponse.json({
            success: true,
            coinsUpdated: savedCount,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('❌ Cron job failed:', error);
        return NextResponse.json(
            {
                success: false,
                error: String(error),
            },
            { status: 500 },
        );
    }
}
