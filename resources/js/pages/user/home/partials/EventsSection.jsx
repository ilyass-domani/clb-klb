import { Link } from '@inertiajs/react';
import { TransText, SectionHeader } from '@/components';
import { FeaturedEventCard, SmallEventCard } from './EventCard';

export default function EventsSection({ recentEvents = [] }) {
    if (!recentEvents.length) return null;

    const [featuredEvent, ...rest] = recentEvents;
    const smallEvents = rest.slice(0, 3);
    return (
        <section className="border-b border-border bg-cl-blue-light/30 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <SectionHeader
                    label={{
                        fr: 'Nos Événements',
                        ar: 'فعالياتنا',
                        nl: 'Onze evenementen',
                    }}
                    title={{
                        fr: 'Événements Récents',
                        ar: 'أحدث الفعاليات',
                        nl: 'Recente evenementen',
                    }}
                />
                <div className="mt-12 grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <FeaturedEventCard event={featuredEvent} />
                    </div>
                    <div className="flex flex-col gap-4">
                        {smallEvents.map((evt) => (
                            <SmallEventCard key={evt.id} event={evt} />
                        ))}
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-alpha transition hover:underline"
                    >
                        <TransText
                            fr="Tous les événements"
                            ar="جميع الفعاليات"
                            nl="Alle evenementen"
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
