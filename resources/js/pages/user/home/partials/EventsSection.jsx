import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';
import { FeaturedEventCard, SmallEventCard } from './EventCard';

export default function EventsSection({ recentEvents = [] }) {
    if (!recentEvents.length) return null;

    const [featuredEvent, ...rest] = recentEvents;
    const smallEvents = rest.slice(0, 3);
    return (
        <section className="border-b border-border bg-cl-blue-light/30 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <p className="text-center text-xs font-medium tracking-wider text-alpha uppercase">
                    <TransText
                        fr="Nos Événements"
                        ar="فعالياتنا"
                        nl="Onze evenementen"
                    />
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold text-foreground lg:text-4xl">
                    <TransText
                        fr="Événements Récents"
                        ar="أحدث الفعاليات"
                        nl="Recente evenementen"
                    />
                </h2>
                <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-alpha" />
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
                <div className="mt-12 text-center">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 rounded-lg border-2 border-alpha bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-alpha transition hover:bg-alpha hover:text-cl-white focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-offset-2"
                    >
                        <TransText
                            fr="VOIR TOUT L'AGENDA"
                            ar="عرض كل الأجندة"
                            nl="BEKIJK VOLLEDIGE AGENDA"
                        />
                        <svg
                            className="h-4 w-4"
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
            </div>
        </section>
    );
}
