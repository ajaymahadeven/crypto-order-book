'use client';

import { useState } from 'react';

import { api } from '~/trpc/react';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

import CoinDetailPanel from '~/components/coin-detail/CoinDetailPanel';
import CoinFilterBar from '~/components/coin-filter/CoinFilterBar';
import Header from '~/components/header/Header';
import OrderBookTable from '~/components/order-book-table/OrderBookTable';

const ALL_COINS = ['BTC/USD', 'ETH/USD', 'XRP/USD', 'LTC/USD', 'DOGE/USD'];

export default function Home() {
    const [activeCoins, setActiveCoins] = useState<string[]>([...ALL_COINS]);
    const [refreshInterval, setRefreshInterval] = useState(1000);
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

    const {
        data: orderBookData,
        refetch,
        isError,
    } = api.orderBook.getOrderBook.useQuery(undefined, {
        refetchInterval: refreshInterval,
    });

    const isConnected =
        !isError && Array.isArray(orderBookData) && orderBookData.length > 0;

    const toggleCoin = (coin: string) => {
        setActiveCoins((prev) =>
            prev.includes(coin)
                ? prev.filter((c) => c !== coin)
                : [...prev, coin],
        );
    };

    const allData = Array.isArray(orderBookData)
        ? (orderBookData as OrderBookData[])
        : [];

    const filtered = allData.filter((d) => activeCoins.includes(d.coin));

    const selectedData = selectedCoin
        ? allData.find((d) => d.coin === selectedCoin)
        : undefined;

    return (
        <div className="min-h-screen bg-background">
            <Header connected={isConnected} />

            <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
                {selectedCoin ? (
                    /* ── Detail view ── */
                    <CoinDetailPanel
                        coin={selectedCoin}
                        liveData={selectedData}
                        onClose={() => setSelectedCoin(null)}
                    />
                ) : (
                    /* ── Table view ── */
                    <>
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                                Order Book
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Real-time top-of-book across pairs
                            </p>
                        </div>

                        <div className="mb-6">
                            <CoinFilterBar
                                activeCoins={activeCoins}
                                onToggle={toggleCoin}
                            />
                        </div>

                        {isError && (
                            <div className="rounded-lg border border-border px-4 py-10 text-center">
                                <p className="text-sm text-muted-foreground">
                                    WebSocket connection failed.
                                </p>
                                <button
                                    onClick={() => refetch()}
                                    className="mt-4 rounded-lg border border-border px-4 py-2 text-xs text-foreground transition-colors hover:bg-muted"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {!isError && !orderBookData && (
                            <div className="rounded-lg border border-border px-4 py-16 text-center">
                                <div className="mx-auto mb-3 h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Connecting...
                                </p>
                            </div>
                        )}

                        {!isError && orderBookData && (
                            <OrderBookTable
                                data={filtered}
                                onRefresh={refetch}
                                refreshInterval={refreshInterval}
                                onRefreshIntervalChange={setRefreshInterval}
                                onSelectCoin={setSelectedCoin}
                            />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
