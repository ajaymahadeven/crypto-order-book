'use client';

import { ArrowUpRight } from 'lucide-react';
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
        { refetchInterval: 300_000 },
    );

    return (
        <div className="mb-8">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                News &amp; Community
            </h3>

            {isLoading && (
                <div className="flex h-24 items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                </div>
            )}

            {isError && (
                <p className="text-sm text-muted-foreground">
                    Unable to load posts.
                </p>
            )}

            {!isLoading && !isError && (!articles || articles.length === 0) && (
                <p className="text-sm text-muted-foreground">
                    No recent posts found.
                </p>
            )}

            {articles && articles.length > 0 && (
                <div className="flex flex-col gap-2">
                    {articles.map((post) => (
                        <a
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30 hover:bg-accent"
                        >
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium leading-snug text-foreground group-hover:underline">
                                    {post.title}
                                </p>
                                {post.body && (
                                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                        {post.body}
                                        {post.body.length >= 200 ? '…' : ''}
                                    </p>
                                )}
                                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground/60">
                                    <span>{post.source}</span>
                                    <span>·</span>
                                    <span>
                                        {getLastUpdatedTime(post.publishedOn)}
                                    </span>
                                    <span>·</span>
                                    <span>↑ {post.score}</span>
                                </div>
                            </div>
                            <ArrowUpRight
                                size={14}
                                className="mt-0.5 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground"
                            />
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
