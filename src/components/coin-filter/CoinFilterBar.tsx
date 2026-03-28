'use client';

const ALL_COINS = ['BTC/USD', 'ETH/USD', 'XRP/USD', 'LTC/USD', 'DOGE/USD'];

interface CoinFilterBarProps {
    activeCoins: string[];
    onToggle: (coin: string) => void;
}

export default function CoinFilterBar({
    activeCoins,
    onToggle,
}: CoinFilterBarProps) {
    const allActive = activeCoins.length === ALL_COINS.length;

    const handleAll = () => {
        if (!allActive) {
            ALL_COINS.forEach((coin) => {
                if (!activeCoins.includes(coin)) onToggle(coin);
            });
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <button
                onClick={handleAll}
                className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
                    allActive
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                }`}
            >
                All
            </button>
            {ALL_COINS.map((coin) => {
                const isActive = activeCoins.includes(coin);
                const symbol = coin.split('/')[0];
                return (
                    <button
                        key={coin}
                        onClick={() => onToggle(coin)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
                            isActive
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                        }`}
                    >
                        {symbol}
                    </button>
                );
            })}
        </div>
    );
}
