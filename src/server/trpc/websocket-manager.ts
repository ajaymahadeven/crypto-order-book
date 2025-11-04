// ==========================================
//  WEBSOCKET MANAGER
// ==========================================
// This is like a "mail collector"
// It stays connected and saves ALL messages
import { WebSocket } from 'ws';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

class WebSocketManager {
    private ws: WebSocket | null = null;
    private latestData: Map<string, OrderBookData> = new Map(); // Store latest for each coin
    private url: string;

    constructor(url: string) {
        this.url = url;
        this.connect();
    }

    // Connect and STAY connected
    private connect() {
        console.log('📞 Calling WebSocket...');

        this.ws = new WebSocket(this.url);

        // When connection opens
        this.ws.on('open', () => {
            console.log('✅ Connected! Listening for data...');
        });

        // When we get a message (THIS RUNS FOREVER!)
        this.ws.on('message', (data: Buffer) => {
            try {
                const orderBookData: OrderBookData = JSON.parse(
                    data.toString(),
                );

                // Save the latest data for this coin
                this.latestData.set(orderBookData.coin, orderBookData);

                console.log(`📥 Got data for: ${orderBookData.coin}`);
            } catch (error) {
                console.error('❌ Bad data received:', error);
            }
        });

        // If connection closes, reconnect!
        this.ws.on('close', () => {
            console.log('📞 Connection closed. Reconnecting in 5 seconds...');
            setTimeout(() => this.connect(), 5000);
        });

        // If error happens
        this.ws.on('error', (error) => {
            console.error('❌ WebSocket error:', error);
        });
    }

    // Get the latest data for a specific coin
    getLatestData(coin: string): OrderBookData | undefined {
        return this.latestData.get(coin);
    }

    // Get latest data for ALL coins
    getAllLatestData(): OrderBookData[] {
        return Array.from(this.latestData.values());
    }

    // Add a callback that runs every time new data arrives
    onData(callback: (data: OrderBookData) => void) {
        if (!this.ws) return;

        this.ws.on('message', (data: Buffer) => {
            try {
                const orderBookData: OrderBookData = JSON.parse(
                    data.toString(),
                );
                callback(orderBookData);
            } catch (error) {
                console.error('Error in callback:', error);
            }
        });
    }
}

// Create ONE manager for the whole app (singleton)
const wsManager = new WebSocketManager(
    process.env.WS_URL || 'ws://localhost:8080',
);

export { wsManager };
