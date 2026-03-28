'use client';

import { ArrowLeft } from 'lucide-react';
import { api } from '~/trpc/react';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

import NewsSection from '~/components/coin-detail/NewsSection';
import DepthRow from '~/components/order-book-table/DepthRow';
import { getTokenDescription } from '~/data/token/tokenData';

interface CoinDetailPanelProps {
    coin: string;
    liveData: OrderBookData | undefined;
    onClose: () => void;
}

function StatCard({
    label,
    value,
    sub,
}: {
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <div className="rounded-lg border border-border bg-card p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {label}
            </p>
            <p className="font-mono text-lg font-semibold text-foreground">
                {value}
            </p>
            {sub && (
                <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
            )}
        </div>
    );
}

export default function CoinDetailPanel({
    coin,
    liveData,
    onClose,
}: CoinDetailPanelProps) {
    const { data: stats, isLoading } = api.orderBook.getDailyStats.useQuery(
        { coin },
        { refetchInterval: 5000 },
    );

    const description = getTokenDescription(coin);
    const symbol = coin.split('/')[0];

    const bestBid = liveData?.bids[0]?.[1];
    const bestAsk = liveData?.asks[0]?.[1];
    const liveSpreaPct =
        bestBid && bestAsk && bestAsk > 0
            ? (((bestAsk - bestBid) / bestAsk) * 100).toFixed(4)
            : null;

    return (
        <div className="w-full">
            {/* Back */}
            <button
                onClick={onClose}
                className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft size={15} />
                All pairs
            </button>

            {/* Coin header */}
            <div className="mb-8">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                        {symbol}
                    </h2>
                    <span className="text-sm text-muted-foreground">/USD</span>
                </div>
                {description && (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {/* Live snapshot */}
            <div className="mb-8">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Live
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatCard
                        label="Best Bid"
                        value={bestBid != null ? bestBid.toLocaleString() : '—'}
                    />
                    <StatCard
                        label="Best Ask"
                        value={bestAsk != null ? bestAsk.toLocaleString() : '—'}
                    />
                    <StatCard
                        label="Spread"
                        value={liveSpreaPct ? `${liveSpreaPct}%` : '—'}
                    />
                    <StatCard
                        label="Exchange"
                        value={liveData?.exchange ?? '—'}
                    />
                </div>
            </div>

            {/* Today's stats */}
            <div className="mb-8">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Today
                </h3>
                {isLoading ? (
                    <div className="flex h-24 items-center justify-center">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                    </div>
                ) : !stats ? (
                    <p className="text-sm text-muted-foreground">
                        No historical data captured yet today.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <StatCard
                            label="Max Bid"
                            value={
                                stats.maxBid != null
                                    ? stats.maxBid.toLocaleString()
                                    : '—'
                            }
                            sub="Highest bid seen today"
                        />
                        <StatCard
                            label="Min Bid"
                            value={
                                stats.minBid != null
                                    ? stats.minBid.toLocaleString()
                                    : '—'
                            }
                            sub="Lowest bid seen today"
                        />
                        <StatCard
                            label="Max Ask"
                            value={
                                stats.maxAsk != null
                                    ? stats.maxAsk.toLocaleString()
                                    : '—'
                            }
                            sub="Highest ask seen today"
                        />
                        <StatCard
                            label="Min Ask"
                            value={
                                stats.minAsk != null
                                    ? stats.minAsk.toLocaleString()
                                    : '—'
                            }
                            sub="Lowest ask seen today"
                        />
                        <StatCard
                            label="Snapshots"
                            value={stats.snapshots.toLocaleString()}
                            sub="Records captured today"
                        />
                        <StatCard
                            label="Avg Spread"
                            value={
                                stats.spreadPct ? `${stats.spreadPct}%` : '—'
                            }
                            sub="Current spread %"
                        />
                    </div>
                )}
            </div>

            {/* Depth ladder */}
            {liveData && (
                <div className="mb-8">
                    <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Order Depth
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-border">
                        <DepthRow data={liveData} />
                    </div>
                </div>
            )}

            <NewsSection coin={coin} />
        </div>
    );
}
