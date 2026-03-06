import { Link } from '@inertiajs/react';

/**
 * Horizontal row of category filter buttons. "Tout" and category slugs match backend.
 * Active filter uses bg-alpha and text-cl-white; others use border and text-foreground.
 *
 * @param {{ categories: Array<{ slug: string, label: string }>, currentCategory: string }} props
 */
export default function CategoryFilters({ categories = [], currentCategory = 'tout' }) {
    return (
        <div className="flex flex-wrap justify-center gap-2 px-4 pb-8 sm:gap-3">
            {categories.map(({ slug, label }) => {
                const isActive = currentCategory === slug;
                const url = slug === 'tout' ? '/blogs' : `/blogs?category=${slug}`;

                return (
                    <Link
                        key={slug}
                        href={url}
                        className={`rounded border px-4 py-2 text-sm font-medium transition sm:px-5 sm:py-2.5 ${
                            isActive
                                ? 'border-alpha bg-alpha text-cl-white'
                                : 'border-border bg-card text-foreground hover:border-alpha/50 hover:bg-muted/50'
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}
