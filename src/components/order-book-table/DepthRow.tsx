import type { OrderBookData } from '~/types/interfaces/orderBookData';

interface DepthRowProps {
    data: OrderBookData;
}

export default function DepthRow({ data }: DepthRowProps) {
    return (
        <div className="grid grid-cols-2 gap-6 bg-muted/40 px-4 py-4">
            <div>
                <div className="mb-2 grid grid-cols-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    <span>Bid Price</span>
                    <span className="text-right">Qty</span>
                </div>
                {data.bids.map((bid, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-2 py-1 text-xs text-foreground"
                    >
                        <span className="font-mono">
                            {bid[1].toLocaleString()}
                        </span>
                        <span className="text-right font-mono text-muted-foreground">
                            {bid[0].toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
            <div>
                <div className="mb-2 grid grid-cols-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    <span>Ask Price</span>
                    <span className="text-right">Qty</span>
                </div>
                {data.asks.map((ask, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-2 py-1 text-xs text-foreground"
                    >
                        <span className="font-mono">
                            {ask[1].toLocaleString()}
                        </span>
                        <span className="text-right font-mono text-muted-foreground">
                            {ask[0].toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
