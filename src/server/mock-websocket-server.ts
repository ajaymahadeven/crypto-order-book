// ==========================================
//  FAKE WEBSOCKET SERVER
// ==========================================
// This pretends to be a crypto exchange
// It sends fake prices every 500ms
import { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

// The coins we'll send data for
const COINS = ['BTC/USD', 'ETH/USD', 'DOGE/USD', 'XRP/USD', 'LTC/USD'];

// Starting prices
const PRICES: Record<string, number> = {
    'BTC/USD': 95000,
    'ETH/USD': 3500,
    'DOGE/USD': 0.35,
    'XRP/USD': 2.5,
    'LTC/USD': 105,
};

// TODO: Decimal values are currently truncated to 3 digits for simplicity
// In production, consider using proper decimal precision based on coin type
function truncate(num: number): number {
    return Math.floor(num * 1000) / 1000;
}

// Make fake order book data
function makeFakeOrderBook(coin: string) {
    const price = PRICES[coin]!;

    // 5 buy orders (bids) - slightly below price
    const bids: [number, number][] = [
        [truncate(price - 10), truncate(1.5)],
        [truncate(price - 20), truncate(2.0)],
        [truncate(price - 30), truncate(1.8)],
        [truncate(price - 40), truncate(2.5)],
        [truncate(price - 50), truncate(3.0)],
    ];

    // 5 sell orders (asks) - slightly above price
    const asks: [number, number][] = [
        [truncate(price + 10), truncate(1.2)],
        [truncate(price + 20), truncate(1.8)],
        [truncate(price + 30), truncate(2.1)],
        [truncate(price + 40), truncate(1.9)],
        [truncate(price + 50), truncate(2.7)],
    ];

    return {
        timestamp: Date.now(),
        exchange: 'MockExchange',
        coin,
        bids: bids as any,
        asks: asks as any,
    };
}

console.log(`🚀 Fake WebSocket Server running on ws://localhost:${PORT}`);

// When someone connects...
wss.on('connection', (ws) => {
    console.log('✅ Someone connected!');

    let coinIndex = 0;

    // Send data every 500ms
    const interval = setInterval(() => {
        const coin = COINS[coinIndex]!;
        const data = makeFakeOrderBook(coin);

        ws.send(JSON.stringify(data));
        console.log(`📤 Sent: ${coin}`);

        // Next coin
        coinIndex = (coinIndex + 1) % COINS.length;

        // Change prices a tiny bit (make it realistic)
        PRICES[coin] = truncate(
            PRICES[coin]! * (1 + (Math.random() - 0.5) * 0.0002),
        );
    }, 500);

    ws.on('close', () => {
        console.log('❌ Someone disconnected');
        clearInterval(interval);
    });

    ws.on('error', (error) => {
        console.error('⚠️ Client error (this is normal):', error.message);
        clearInterval(interval);
    });
});

wss.on('error', (error) => {
    console.error('🔥 Server error:', error);
});
