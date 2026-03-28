export const siteConfig = {
    name: 'Order Book',
    title: 'Order Book — Real-time Crypto Bid/Ask Data',
    url: 'https://order-book-one.vercel.app',
    description:
        'Real-time order book depth for BTC, ETH, XRP, LTC and DOGE. Live top-of-book bid/ask prices, spread, and daily stats. Built with Next.js, tRPC, and WebSockets.',
    shortDescription: 'Real-time crypto order book depth.',
    author: {
        name: 'Ajay Mahadeven',
        github: 'https://github.com/thenameisajay',
    },
    links: {
        github: 'https://github.com/thenameisajay/order-book',
    },
    keywords: [
        'order book',
        'crypto order book',
        'bitcoin order book',
        'cryptocurrency',
        'bid ask spread',
        'real-time trading data',
        'BTC USD',
        'ETH USD',
        'depth chart',
        'market data',
        'next.js',
        'trpc',
        'websocket',
        'open source',
    ],
};

export type SiteConfig = typeof siteConfig;
