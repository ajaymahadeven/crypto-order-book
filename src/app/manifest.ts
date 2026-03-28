import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Order Book',
        short_name: 'OrderBook',
        description:
            'Real-time crypto order book data — live bid/ask depth for BTC, ETH, XRP, LTC & DOGE.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/apple-icon',
                sizes: '180x180',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}
