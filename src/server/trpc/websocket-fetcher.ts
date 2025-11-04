// ==========================================
// SIMPLE WEBSOCKET FETCHER
// ==========================================
// Connects, gets data, then disconnects
// Perfect for Vercel Cron Jobs!
import { WebSocket } from 'ws';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

/**
 * Fetch order book data from WebSocket on-demand
 * Waits for 5 messages (one per coin), then closes
 */
export function fetchOrderBookData(): Promise<OrderBookData[]> {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(process.env.WS_URL || 'ws://localhost:8080');
        const collectedData: OrderBookData[] = [];

        const timeout = setTimeout(() => {
            ws.close();
            if (collectedData.length > 0) {
                resolve(collectedData);
            } else {
                reject(new Error('Timeout: No data received'));
            }
        }, 10000); // 10 second timeout

        ws.on('open', () => {
            console.log('📞 Connected to WebSocket');
        });

        ws.on('message', (data: Buffer) => {
            try {
                const orderBookData: OrderBookData = JSON.parse(
                    data.toString(),
                );

                // Only add if we don't already have this coin
                const existingCoin = collectedData.find(
                    (d) => d.coin === orderBookData.coin,
                );
                if (!existingCoin) {
                    collectedData.push(orderBookData);
                    console.log(`📥 Received: ${orderBookData.coin}`);
                }

                // Once we have all 5 coins, close and return
                if (collectedData.length === 5) {
                    clearTimeout(timeout);
                    ws.close();
                    resolve(collectedData);
                }
            } catch (error) {
                console.error('❌ Error parsing message:', error);
            }
        });

        ws.on('error', (error) => {
            clearTimeout(timeout);
            console.error('❌ WebSocket error:', error);
            reject(error);
        });

        ws.on('close', () => {
            clearTimeout(timeout);
            console.log('📞 WebSocket closed');
            if (collectedData.length > 0) {
                resolve(collectedData);
            }
        });
    });
}
