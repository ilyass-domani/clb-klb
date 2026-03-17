import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

/**
 * Blog listing pagination: page numbers as circles, current page in red, "SUIVANT >" link.
 * Expects pagination with links (url, label, active) and optional prev_url/next_url.
 *
 * @param {{ pagination: { current_page: number, last_page: number, links: Array<{ url: string | null, label: string, active: boolean }>, prev_url?: string | null, next_url?: string | null } }} props
 */
export default function Pagination({ pagination }) {
    if (!pagination || pagination.last_page <= 1) {
        return null;
    }

    const { current_page, last_page, links, prev_url, next_url } = pagination;

    const pageLinks =
        links && links.length > 0
            ? links
            : Array.from({ length: last_page }, (_, i) => ({
                  url: `?page=${i + 1}`,
                  label: String(i + 1),
                  active: i + 1 === current_page,
              }));

    return (
        <nav
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            aria-label="Pagination"
        >
            {prev_url ? (
                <Link
                    href={prev_url}
                    preserveScroll
                    className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase hover:text-alpha"
                >
                    <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <TransText fr="PRÉCÉDENT" ar="السابق" nl="VORIGE" />
                </Link>
            ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest text-cl-white/40 uppercase select-none">
                    <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <TransText fr="PRÉCÉDENT" ar="السابق" nl="VORIGE" />
                </span>
            )}

            <div className="flex items-center gap-1.5">
                {pageLinks.map((link, idx) => {
                    const isNumber = /^\d+$/.test(link.label.trim());
                    if (!isNumber) return null;

                    const isActive = link.active;
                    const className = `flex h-8 w-8 items-center border justify-center rounded-full text-sm font-medium transition ${
                        isActive
                            ? 'bg-alpha text-cl-white'
                            : 'bg-cl-white text-cl-black border-gray-200 hover:bg-cl-white/90'
                    }`;

                    if (!link.url) {
                        return (
                            <span
                                key={idx}
                                className={className}
                                aria-current="page"
                            >
                                {link.label}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={idx}
                            href={link.url}
                            className={className}
                            preserveScroll
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            {last_page > 3 && <span className="px-1 text-cl-white/80">...</span>}

            {next_url ? (
                <Link
                    href={next_url}
                    preserveScroll
                    className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase hover:text-alpha"
                >
                    <TransText fr="SUIVANT" ar="التالي" nl="VOLGENDE" />
                    <svg
                        className="h-3.5 w-3.5"
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
            ) : (
                <span className="text-xs font-semibold tracking-widest text-cl-white/40 uppercase select-none">
                    <TransText fr="SUIVANT" ar="التالي" nl="VOLGENDE" />
                </span>
            )}
        </nav>
    );
}
