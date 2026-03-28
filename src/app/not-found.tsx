'use client';

import Link from 'next/link';

import { Frown } from 'lucide-react';

import { Button } from '~/components/ui/button';

export default function NotFoundComponent() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-foreground">
            <Frown
                size={64}
                className="text-muted-foreground"
                strokeWidth={1}
            />
            <div className="space-y-2 text-center">
                <h1 className="text-4xl font-semibold tracking-tight">404</h1>
                <p className="text-sm text-muted-foreground">
                    This page doesn&apos;t exist.
                </p>
            </div>
            <Link href="/">
                <Button variant="outline">Go home</Button>
            </Link>
        </div>
    );
}
