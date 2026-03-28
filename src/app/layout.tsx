import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

import { ThemeProvider } from '~/components/theme/ThemeProvider';
import { siteConfig } from '~/data/site/site';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),

    title: {
        default: siteConfig.title,
        template: `%s — Order Book`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,

    authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,

    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Order Book — Real-time Crypto Bid/Ask Data',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        images: ['/opengraph-image'],
        creator: '@thenameisajay',
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    manifest: '/manifest',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`font-sans ${inter.className}`}
                suppressHydrationWarning
            >
                <ThemeProvider>
                    <TRPCReactProvider>
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </TRPCReactProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
