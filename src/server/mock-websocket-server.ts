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

// Make fake order book data
function makeFakeOrderBook(coin: string) {
    const price = PRICES[coin]!;

    // 5 buy orders (bids) - slightly below price
    const bids: [number, number][] = [
        [price - 10, 1.5],
        [price - 20, 2.0],
        [price - 30, 1.8],
        [price - 40, 2.5],
        [price - 50, 3.0],
    ];

    // 5 sell orders (asks) - slightly above price
    const asks: [number, number][] = [
        [price + 10, 1.2],
        [price + 20, 1.8],
        [price + 30, 2.1],
        [price + 40, 1.9],
        [price + 50, 2.7],
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
        PRICES[coin] = PRICES[coin]! * (1 + (Math.random() - 0.5) * 0.0002);
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
