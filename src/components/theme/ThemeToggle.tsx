'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
    );
}
