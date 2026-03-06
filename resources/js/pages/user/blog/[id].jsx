import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

/**
 * Single blog post detail page. Uses AppLayout; content only (no Navbar/Footer here).
 */
export default function BlogPostShow({ blog }) {
    if (!blog) {
        return null;
    }

    const { title, excerpt, body, category, image_url, published_at } = blog;

    return (
        <>
            <Head title={`${title} - Blog CLB`} />
            <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-alpha"
                >
                    <TransText fr="← Retour au blog" ar="← العودة إلى المدونة" nl="← Terug naar blog" />
                </Link>
                <div className="mt-6">
                    <span className="rounded bg-alpha/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-alpha">
                        {category}
                    </span>
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
                        <img src={image_url} alt="" className="h-full w-full object-cover" />
                    </div>
                )}
                {excerpt && (
                    <p className="mt-6 text-muted-foreground">{excerpt}</p>
                )}
                {body && (
                    <div
                        className="prose prose-foreground mt-6 max-w-none"
                        dangerouslySetInnerHTML={{ __html: body }}
                    />
                )}
            </article>
        </>
    );
}

BlogPostShow.layout = (page) => <AppLayout>{page}</AppLayout>;
