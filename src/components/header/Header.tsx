'use client';

import Link from 'next/link';

import { Github } from 'lucide-react';

import ConnectionBadge from '~/components/connection-badge/ConnectionBadge';
import ThemeToggle from '~/components/theme/ThemeToggle';

const gitRepo = 'https://github.com/thenameisajay/order-book';

interface HeaderProps {
    connected: boolean;
}

export default function Header({ connected }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded border border-border bg-muted">
                        <span className="text-xs font-bold tracking-tighter text-foreground">
                            OB
                        </span>
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-foreground">
                        Order Book
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <ConnectionBadge connected={connected} />
                    <ThemeToggle />
                    <a
                        href={gitRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="GitHub"
                    >
                        <Github size={17} />
                    </a>
                </div>
            </div>
        </header>
    );
}
