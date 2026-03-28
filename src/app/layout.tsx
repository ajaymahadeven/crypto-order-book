import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

import { ThemeProvider } from '~/components/theme/ThemeProvider';
import { siteConfig } from '~/data/site/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: siteConfig.title,
    applicationName: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    creator: 'Ajay Mahadeven - https://github.com/ajaymahadeven',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
                <link
                    rel="apple-touch-icon"
                    href="/apple-icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
            </head>
            <body className={`font-sans ${inter.className}`}>
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
