import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

/**
 * Single blog card: image, date, title, excerpt, "Lire l'article" link.
 * Uses project semantic colors (alpha, foreground, muted-foreground).
 *
 * @param {{ blog: { id: number, title: string, excerpt: string, image_url: string, published_at: string, url: string } }} props
 */
export default function BlogCard({ blog }) {
    const { title, excerpt, image_url, published_at, url } = blog;

    return (
        <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                {image_url && (
                    <img
                        src={image_url}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                )}
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
                {published_at && (
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase sm:text-sm">
                        {published_at}
                    </p>
                )}
                <h2 className="mt-2 line-clamp-2 text-lg font-bold text-foreground sm:text-xl">
                    {title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {excerpt}
                </p>
                <Link
                    href={url}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-alpha"
                >
                    <TransText
                        fr="LIRE L'ARTICLE"
                        ar="اقرأ المقال"
                        nl="LEES HET ARTIKEL"
                    />
                    <svg
                        className="h-4 w-4 text-alpha"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
