'use client';

interface ConnectionBadgeProps {
    connected: boolean;
}

export default function ConnectionBadge({ connected }: ConnectionBadgeProps) {
    return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
                {connected && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-30" />
                )}
                <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                        connected ? 'bg-foreground' : 'bg-muted-foreground/40'
                    }`}
                />
            </span>
            <span className="uppercase tracking-wide">
                {connected ? 'Live' : 'Disconnected'}
            </span>
        </div>
    );
}
