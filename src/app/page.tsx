'use client';

import React from 'react';

import { Warning } from '@phosphor-icons/react';
import { api } from '~/trpc/react';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

import DesktopTable from '~/components/home/DesktopTable';
import Loading from '~/components/states/Loading';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

const HomePageBanner = () => {
    const heading = 'Unlock the Power of Crypto Order Book Data';

    const description =
        'Dive into the real-time order book dynamics of your favorite cryptocurrencies. Our intuitive interface lets you seamlessly track and analyze market trends, empowering your trading decisions.';

    return (
        <div className="   mt-6 flex w-full items-center justify-center text-center ">
            <div className="-dvh container flex flex-col ">
                <h1 className="mb-4 text-center text-4xl font-bold md:text-6xl 2xl:mb-9 2xl:text-8xl ">
                    {heading}
                </h1>
                <p className=" mx-auto w-1/2 text-center text-sm font-light  md:text-2xl 2xl:text-3xl ">
                    {description}
                </p>
            </div>
        </div>
    );
};

const ErrorDisplay = ({ refetch }: { refetch: () => void }) => {
    const errorMessage = 'Error fetching data, please try again later';

    return (
        <div className="absolute  bottom-10 flex  w-full flex-col items-center justify-center sm:bottom-44 md:bottom-60 2xl:bottom-80">
            <Card className="mx-4 flex flex-col items-center justify-center">
                <div className="mx-auto flex flex-col items-center px-4 text-center ">
                    <Warning
                        size={75}
                        className="m-2"
                        weight="bold"
                        color="#ec0909"
                    />
                    <h1 className="text-base font-semibold  text-red-500 md:text-2xl">
                        {errorMessage}
                    </h1>
                </div>
                <Button
                    onClick={refetch}
                    variant={'outline'}
                    className="m-4 rounded-md  p-2 text-lg font-semibold"
                >
                    Retry
                </Button>
            </Card>
        </div>
    );
};

export default function Home() {
    const {
        data: orderBookData,
        refetch,
        isError,
    } = api.orderBook.getOrderBook.useQuery();

    console.log('orderBookData', orderBookData);

    return (
        <>
            <HomePageBanner />
            {!isError ? (
                <DesktopTable orderBookData={orderBookData || []} />
            ) : (
                <ErrorDisplay refetch={refetch} />
            )}
        </>
    );
}
