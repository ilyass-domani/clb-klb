import { Link } from '@inertiajs/react';
import { TransText, SectionHeader } from '@/components';
import BlogCard from '../../blog/partials/BlogCard';

/**
 * Shows latest blog posts when latestBlogs prop is provided; otherwise a single CTA to the blog.
 * @param {{ latestBlogs?: Array<{ id: number, title: string, description: string, image_url: string|null, published_at: string, url: string }> }} props
 */
export function LatestBlogSection({ latestBlogs = [] }) {
    const hasBlogs = Array.isArray(latestBlogs) && latestBlogs.length > 0;
    if (!hasBlogs) return null;

    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="container">
                <SectionHeader
                    label={{
                        ar: 'الأخبار',
                        fr: 'Actualité',
                        nl: 'Nieuws',
                    }}
                    title={{
                        ar: 'آخر المقالات',
                        fr: 'Derniers articles',
                        nl: 'Laatste artikelen',
                    }}
                />
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {latestBlogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-alpha transition hover:underline"
                    >
                        <TransText
                            fr="Tous les articles"
                            ar="جميع المقالات"
                            nl="Alle artikelen"
                            as="span"
                        />
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default LatestBlogSection;
