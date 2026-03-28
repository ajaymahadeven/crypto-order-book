'use client';

import { RefreshCw } from 'lucide-react';
import type { OrderBookData } from '~/types/interfaces/orderBookData';
import { getLastUpdatedTime } from '~/utils/lastUpdated';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table';

const REFRESH_OPTIONS = [
    { label: '500ms', value: 500 },
    { label: '1s', value: 1000 },
    { label: '5s', value: 5000 },
];

function SpreadCell({
    bids,
    asks,
}: {
    bids: [number, number][];
    asks: [number, number][];
}) {
    const bestBid = bids[0]?.[1] ?? 0;
    const bestAsk = asks[0]?.[1] ?? 0;
    if (!bestBid || !bestAsk)
        return <span className="text-muted-foreground/40">—</span>;
    const spreadPct = (((bestAsk - bestBid) / bestAsk) * 100).toFixed(3);
    return (
        <span className="font-mono text-xs text-muted-foreground">
            {spreadPct}%
        </span>
    );
}

interface OrderBookTableProps {
    data: OrderBookData[];
    onRefresh: () => void;
    refreshInterval: number;
    onRefreshIntervalChange: (ms: number) => void;
    onSelectCoin: (coin: string) => void;
}

export default function OrderBookTable({
    data,
    onRefresh,
    refreshInterval,
    onRefreshIntervalChange,
    onSelectCoin,
}: OrderBookTableProps) {
    return (
        <div className="w-full">
            {/* Controls */}
            <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {data.length} pair{data.length !== 1 ? 's' : ''} live
                </p>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
                        {REFRESH_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() =>
                                    onRefreshIntervalChange(opt.value)
                                }
                                className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                                    refreshInterval === opt.value
                                        ? 'bg-foreground text-background'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                        <RefreshCw size={12} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Pair</TableHead>
                            <TableHead>Exchange</TableHead>
                            <TableHead>Best Bid</TableHead>
                            <TableHead>Best Ask</TableHead>
                            <TableHead>Spread</TableHead>
                            <TableHead>Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    Waiting for data...
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => {
                                const bestBid = row.bids[0]?.[1];
                                const bestAsk = row.asks[0]?.[1];

                                return (
                                    <TableRow
                                        key={row.coin}
                                        className="cursor-pointer"
                                        onClick={() => onSelectCoin(row.coin)}
                                    >
                                        <TableCell>
                                            <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
                                                {row.coin}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                                {row.exchange}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono text-sm text-foreground">
                                                {bestBid?.toLocaleString() ??
                                                    '—'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono text-sm text-foreground">
                                                {bestAsk?.toLocaleString() ??
                                                    '—'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <SpreadCell
                                                bids={row.bids}
                                                asks={row.asks}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-muted-foreground">
                                                {getLastUpdatedTime(
                                                    row.timestamp,
                                                )}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            <p className="mt-3 text-xs text-muted-foreground/60">
                Click a row to view detailed stats
            </p>
        </div>
    );
}
