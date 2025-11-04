import { Toaster } from 'react-hot-toast';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

import DevelopmentBanner from '~/components/banner/DBanner';
import DesktopNav from '~/components/nav-bar/DesktopNav';
import MobileNav from '~/components/nav-bar/MobileNav';
import { siteConfig } from '~/data/site/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: siteConfig.title,
    applicationName: siteConfig.title,

    description: siteConfig.description,
    keywords: siteConfig.keywords,

    creator: 'Ajay Mahadeven - https://github.com/ajaymahadeven',
};

/**
 * This is the main layout component for a Next.js application.
 *
 * The `RootLayout` component is responsible for rendering the overall structure and layout of the application,
 * including the HTML structure, global styles, font, toast notifications, development banner, navigation, and tRPC provider.
 *
 * @param {Object} props - The props passed to the `RootLayout` component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered `RootLayout` component.
 */

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
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
                <Toaster />
                <DevelopmentBanner />
                <DesktopNav />
                <MobileNav />
                <TRPCReactProvider>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </TRPCReactProvider>
            </body>
        </html>
    );
}
