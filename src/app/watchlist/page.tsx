'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { X } from '@phosphor-icons/react';
import { useLocalStorage } from 'usehooks-ts';
import { api } from '~/trpc/react';

// import ErrorDisplay from '~/components/error-display/ErrorDisplay';
import HeadBanner from '~/components/head-banner/HeadBanner';
import LoadingDisplay from '~/components/loading-display/LoadingDisplay';
// import DesktopTable from '~/components/order-table/DesktopTable';
import { Button } from '~/components/ui/button';
// import { OrderBookData } from '~/types/interfaces/orderBookData';
import EmptyWatchList from '~/components/watchlist-display/Empty';

const heading: string = 'Watchlist';
const description: string =
    'Curate your personalized crypto portfolio and stay updated on cryptocurrency market trends.';

// const SUPPORTED_COINS = [
//     'BTC/USD',
//     'ETH/USD',
//     'XRP/USD',
//     'LTC/USD',
//     'DOGE/USD',
// ];

export default function Page() {
    const [watchlist, setWatchlist, removeValue] = useLocalStorage(
        'userSelectedWatchList',
        [],
    );

    const {
        data: latestLiveData,
        isError,
        refetch: handleRefresh,
    } = api.orderBook.getOrderBook.useQuery(undefined, {
        refetchInterval: 500,
    });

    if (!latestLiveData) {
        return (
            <div>
                <HeadBanner heading={heading} description={description} />
                <LoadingDisplay />
            </div>
        );
    }

    // const watchlistState = watchlist.reduce(
    //     (acc: Record<string, boolean>, coin) => {
    //         acc[coin] = true;
    //         return acc;
    //     },
    //     {},
    // );

    // const filteredLiveData = latestLiveData.filter(
    //     (item) => watchlistState[item.coin],
    // ) as OrderBookData[];

    const LocalBanner = () => {
        return (
            <div className="flex flex-col items-center">
                <HeadBanner heading={heading} description={description} />
                <div className=" flex w-44 items-center justify-center">
                    <Button
                        className="my-2 flex flex-row bg-red-500 font-bold text-white  hover:bg-red-600 md:mt-6 md:text-base"
                        disabled={watchlist.length === 0 ? true : false}
                        onClick={() => {
                            removeValue();
                            toast.success('Watchlist cleared successfully');
                        }}
                    >
                        <X size={30} weight="bold" className="mx-2" />
                        <span>Clear Watchlist</span>
                    </Button>
                </div>
                {watchlist.length === 0 && <EmptyWatchList />}
            </div>
        );
    };

    console.log('watchlist', watchlist);

    return (
        <>
            <LocalBanner />
        </>
    );
}
