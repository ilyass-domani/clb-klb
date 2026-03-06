import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

/**
 * Blog listing pagination: page numbers as circles, current page in red, "SUIVANT >" link.
 * Expects pagination with links (url, label, active) and optional next_url.
 *
 * @param {{ pagination: { current_page: number, last_page: number, links: Array<{ url: string | null, label: string, active: boolean }>, next_url?: string | null } }} props
 */
export default function Pagination({ pagination }) {
    if (!pagination || pagination.last_page <= 1) {
        return null;
    }

    const { current_page, last_page, links, next_url } = pagination;

    const pageLinks = links && links.length > 0
        ? links
        : Array.from({ length: last_page }, (_, i) => ({
              url: `?page=${i + 1}`,
              label: String(i + 1),
              active: i + 1 === current_page,
          }));

    return (
        <nav
            className="flex flex-wrap items-center justify-center gap-2 px-4 py-10"
            aria-label="Pagination"
        >
            <div className="flex items-center gap-1">
                {pageLinks.map((link, idx) => {
                    const isNumber = /^\d+$/.test(link.label.trim());
                    if (!isNumber) return null;

                    const isActive = link.active;
                    const className = `flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                        isActive
                            ? 'bg-alpha text-cl-white'
                            : 'bg-card text-foreground ring-1 ring-border hover:ring-alpha/50'
                    }`;

                    if (!link.url) {
                        return (
                            <span key={idx} className={className} aria-current="page">
                                {link.label}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={idx}
                            href={link.url}
                            className={className}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            {next_url && (
                <Link
                    href={next_url}
                    className="ml-2 text-sm font-medium text-foreground hover:text-alpha"
                >
                    <TransText fr="SUIVANT >" ar="التالي >" nl="VOLGENDE >" />
                </Link>
            )}
        </nav>
    );
}
