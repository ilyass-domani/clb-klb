import { Link, usePage } from '@inertiajs/react';

const LOCALES = ['fr', 'ar', 'nl'];
const DEFAULT = 'fr';

function pick(obj, locale) {
    if (obj == null || typeof obj !== 'object') return obj;
    const loc = LOCALES.includes(locale) ? locale : DEFAULT;
    return obj[loc] ?? obj.fr ?? obj.ar ?? obj.nl ?? '';
}

export function FeaturedEventCard({ event }) {
    const { props } = usePage();
    const locale = props.locale && LOCALES.includes(props.locale) ? props.locale : DEFAULT;
    const { date, location, imageUrl, href = '#' } = event;
    const title = pick(event.title, locale);
    const subtitle = pick(event.subtitle, locale);
    const moderator = pick(event.moderator, locale);
    const timeRange = pick(event.timeRange, locale);
    const tag = pick(event.tag, locale);

    return (
        <article className="overflow-hidden rounded-xl bg-card shadow-md">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                )}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-cl-black/90 via-cl-black/40 to-transparent p-6">
                    <span className="mb-1 text-sm font-medium uppercase tracking-wide text-cl-white/90">
                        {subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-cl-white lg:text-2xl">{title}</h3>
                    <p className="mt-1 text-sm text-cl-white/90">{moderator}</p>
                </div>
                {tag && (
                    <span className="absolute right-4 top-4 rounded bg-alpha px-2 py-1 text-xs font-medium text-cl-white">
                        {tag}
                    </span>
                )}
            </div>
            <div className="flex flex-wrap items-center gap-4 border-b border-border p-4">
                <span className="flex items-center gap-2 text-sm text-foreground">
                    <svg className="h-4 w-4 text-alpha" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {date}
                </span>
                <span className="text-sm text-muted-foreground">{timeRange}</span>
                <span className="text-sm font-medium text-foreground">{location}</span>
            </div>
            <div className="p-4">
                <Link href={href} className="text-sm font-medium text-alpha hover:underline">
                    {locale === 'fr' && "Voir l'événement →"}
                    {locale === 'ar' && 'عرض الفعالية ←'}
                    {locale === 'nl' && 'Bekijk evenement →'}
                </Link>
            </div>
        </article>
    );
}

export function SmallEventCard({ event }) {
    const { props } = usePage();
    const locale = props.locale && LOCALES.includes(props.locale) ? props.locale : DEFAULT;
    const { imageUrl, href = '#' } = event;
    const title = pick(event.title, locale);
    const subtitle = event.subtitle ? pick(event.subtitle, locale) : null;
    const description = pick(event.description, locale);

    return (
        <Link
            href={href}
            className="flex gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
        >
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                {imageUrl && (
                    <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                )}
            </div>
            <div className="min-w-0 flex-1">
                <h4 className="font-bold text-foreground">{title}</h4>
                {subtitle && (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</p>
            </div>
        </Link>
    );
}
