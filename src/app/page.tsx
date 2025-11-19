'use client';

import React, { useEffect, useState } from 'react';

import { api } from '~/trpc/react';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

import ErrorDisplay from '~/components/error-display/ErrorDisplay';
import HeadBanner from '~/components/head-banner/HeadBanner';
import LoadingDisplay from '~/components/loading-display/LoadingDisplay';
import DuoTable from '~/components/order-table/DuoTable';

const heading: string = 'Unlock the Power of Crypto Order Book Data';
const description: string =
    ' Our intuitive interface lets you seamlessly track and analyze market trends, empowering your trading decisions.';

/**
 * The `Home` component is the main entry point of the application, displaying the order book data for cryptocurrencies.
 *
 * This component uses the `tRPC` API to fetch the order book data and renders it using the `DuoTable` component. If the data is not available or there is an error, it displays appropriate loading or error messages.
 *
 * The component also includes a `HeadBanner` component that displays a heading and description for the page.
 *
 * @returns {JSX.Element} The rendered `Home` component.
 */
export default function Home() {
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    const {
        data: orderBookData,
        refetch,
        isError,
    } = api.orderBook.getOrderBook.useQuery(undefined, {
        refetchInterval: 1,
    });

    // Hide disclaimer once we have data
    useEffect(() => {
        if (
            orderBookData &&
            Array.isArray(orderBookData) &&
            orderBookData.length > 0
        ) {
            setShowDisclaimer(false);
        }
    }, [orderBookData]);

    console.log('orderBookData', orderBookData);

    if (!orderBookData && !isError) {
        return (
            <>
                <HeadBanner heading={heading} description={description} />
                <LoadingDisplay />
            </>
        );
    }

    const hasData =
        orderBookData &&
        Array.isArray(orderBookData) &&
        orderBookData.length > 0;

    return (
        <>
            <HeadBanner heading={heading} description={description} />
            <div className="lg:py-30 flex py-10 md:py-24">
                {!isError ? (
                    <div className="w-full">
                        {showDisclaimer && !hasData && (
                            <div className="mb-4 rounded-md px-4 py-3 text-sm   font-bold text-green-800 transition-opacity duration-300">
                                <p className="text-center">
                                    🔄 Starting up WebSocket connection... This
                                    may take a few seconds on first load.
                                </p>
                            </div>
                        )}
                        <DuoTable
                            orderBookData={
                                (orderBookData as OrderBookData[]) || []
                            }
                            refetch={refetch}
                            showDetails={true}
                        />
                    </div>
                ) : (
                    <ErrorDisplay refetch={refetch} />
                )}
            </div>
        </>
    );
}
