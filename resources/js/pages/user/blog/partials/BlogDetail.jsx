import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

/**
 * Renders a single blog post: back link, date, title, image, excerpt, and full body (TipTap HTML in prose).
 * Uses current locale translation (passed from server); static labels use TransText.
 *
 * @param {{ blog: { title: string, excerpt?: string, body?: string, image_url?: string, published_at?: string, url?: string } }} props
 */
export default function BlogDetail({ blog }) {
    if (!blog) {
        return null;
    }

    const { title, excerpt, body, image_url, published_at } = blog;

    return (
        <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
            <Link
                href="/blogs"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-alpha"
            >
                <TransText
                    fr="← Retour au blog"
                    ar="← العودة إلى المدونة"
                    nl="← Terug naar blog"
                />
            </Link>
            <div className="mt-6">
                {published_at && (
                    <p className="mt-3 text-sm text-muted-foreground">
                        {published_at}
                    </p>
                )}
                <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                    {title}
                </h1>
            </div>
            {image_url && (
                <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <img
                        src={image_url}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            {excerpt && <p className="mt-6 text-muted-foreground">{excerpt}</p>}
            {body && (
                <div
                    className="prose prose-foreground mt-6 max-w-none"
                    dangerouslySetInnerHTML={{ __html: body }}
                />
            )}
        </article>
    );
}
