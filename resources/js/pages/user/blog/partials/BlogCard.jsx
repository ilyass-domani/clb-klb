import { Link } from '@inertiajs/react';

/**
 * Single blog post card: image, category tag, date • author, title, excerpt, "Lire l'article" link.
 * Uses project semantic colors (alpha, foreground, muted-foreground).
 *
 * @param {{ post: { id: number, title: string, excerpt: string, category: string, image_url: string, published_at: string, author: string, url: string } }} props
 */
export default function BlogCard({ post }) {
    const { title, excerpt, category, image_url, published_at, author, url } = post;

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
                <span className="absolute left-3 top-3 rounded bg-cl-white/95 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-alpha">
                    {category}
                </span>
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                    {published_at} • {author}
                </p>
                <h2 className="mt-2 line-clamp-2 font-serif text-lg font-bold text-foreground sm:text-xl">
                    {title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {excerpt}
                </p>
                <Link
                    href={url}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-alpha"
                >
                    LIRE L'ARTICLE
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
