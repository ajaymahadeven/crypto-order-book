'use client';

import { ExternalLink } from 'lucide-react';
import { api } from '~/trpc/react';
import { getLastUpdatedTime } from '~/utils/lastUpdated';

interface NewsSectionProps {
    coin: string;
}

export default function NewsSection({ coin }: NewsSectionProps) {
    const {
        data: articles,
        isLoading,
        isError,
    } = api.orderBook.getCoinNews.useQuery(
        { coin },
        { refetchInterval: 300_000 }, // refresh every 5 min
    );

    return (
        <div className="mb-8">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                News
            </h3>

            {isLoading && (
                <div className="flex h-24 items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                </div>
            )}

            {isError && (
                <p className="text-sm text-muted-foreground">
                    Unable to load news.
                </p>
            )}

            {!isLoading && !isError && (!articles || articles.length === 0) && (
                <p className="text-sm text-muted-foreground">
                    No recent news found.
                </p>
            )}

            {articles && articles.length > 0 && (
                <div className="flex flex-col gap-3">
                    {articles.map((article) => (
                        <a
                            key={article.id}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col gap-1.5 rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30 hover:bg-accent"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <p className="text-sm font-medium leading-snug text-foreground group-hover:underline">
                                    {article.title}
                                </p>
                                <ExternalLink
                                    size={13}
                                    className="mt-0.5 shrink-0 text-muted-foreground"
                                />
                            </div>
                            {article.body && (
                                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                    {article.body}
                                    {article.body.length >= 200 ? '…' : ''}
                                </p>
                            )}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                                <span>{article.source}</span>
                                <span>·</span>
                                <span>
                                    {getLastUpdatedTime(article.publishedOn)}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
