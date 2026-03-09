import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';
import BlogCard from '../../blog/Partials/BlogCard';

/**
 * Shows latest blog posts when latestBlogs prop is provided; otherwise a single CTA to the blog.
 * @param {{ latestBlogs?: Array<{ id: number, title: string, excerpt: string, image_url: string|null, published_at: string, url: string }> }} props
 */
export default function LatestBlogSection({ latestBlogs = [] }) {
    const hasBlogs = Array.isArray(latestBlogs) && latestBlogs.length > 0;

    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <p className="text-center text-sm font-semibold tracking-[0.15em] text-alpha uppercase">
                    <TransText
                        fr="Actualité"
                        ar="الأخبار"
                        nl="Nieuws"
                        as="span"
                    />
                </p>
                <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                    <TransText
                        fr="Derniers articles"
                        ar="آخر المقالات"
                        nl="Laatste artikelen"
                        as="span"
                    />
                </h2>
                <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-alpha" />
                {hasBlogs ? (
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {latestBlogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-12 flex justify-center">
                        <Link
                            href="/blogs"
                            className="group flex max-w-md flex-col items-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-8 py-12 text-center transition hover:border-alpha/40 hover:bg-alpha/5"
                        >
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-alpha/10 text-alpha transition group-hover:bg-alpha group-hover:text-cl-white">
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m4-4h-1m-1 4h2m2 4h2m-4 0V6" />
                                </svg>
                            </span>
                            <p className="mt-4 font-semibold text-foreground">
                                <TransText
                                    fr="Découvrir le blog"
                                    ar="اكتشف المدونة"
                                    nl="Ontdek de blog"
                                    as="span"
                                />
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                <TransText
                                    fr="Articles, événements et actualités du Cercle."
                                    ar="مقالات وفعاليات وأخبار الدائرة."
                                    nl="Artikelen, evenementen en nieuws van de Kring."
                                    as="span"
                                />
                            </p>
                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-alpha group-hover:underline">
                                <TransText fr="Voir le blog" ar="عرض المدونة" nl="Bekijk de blog" as="span" />
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                )}
                {hasBlogs && (
                    <div className="mt-10 text-center">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-alpha transition hover:underline"
                        >
                            <TransText fr="Tous les articles" ar="جميع المقالات" nl="Alle artikelen" as="span" />
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
