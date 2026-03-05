import { Link } from '@inertiajs/react';
import { Clock1Icon } from 'lucide-react';

// const events = [
//     {
//         id: 1,
//         day: '06',
//         month: 'MAR',
//         category: 'Conférence',
//         title: "F'tor-Débat : Leadership Féminin, Réalités Et Défis",
//         time: '17:30',
//         location: 'Cinéma Renaissance, Rabat',
//         description:
//             'Rencontre exceptionnelle avec Dr Younes Sakkouri, Ministre de l\'Inclusion...',
//         price: 'À partir de 300 DH',
//         imageUrl:
//             'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80',
//     },
//     {
//         id: 2,
//         day: '15',
//         month: 'AVR',
//         category: 'Gala',
//         title: 'Gala Annuel des Lauréats de Belgique',
//         time: '19:00',
//         location: 'Hôtel Sofitel, Casablanca',
//         description:
//             "Célébrez l'excellence et l'amitié maroco-belge lors de notre prestigieux gala annuel. Dîner...",
//         price: 'Sur invitation',
//         imageUrl:
//             'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
//     },
//     {
//         id: 3,
//         day: '28',
//         month: 'MAI',
//         category: 'Networking',
//         title: 'Afterwork B2B : Synergies Économiques',
//         time: '18:30',
//         location: 'The View Hotel, Rabat',
//         description:
//             'Une soirée de réseautage dédiée aux entrepreneurs et cadres dirigeants pour créer de...',
//         price: 'Gratuit pour membres',
//         imageUrl:
//             'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
//     },
//     {
//         id: 4,
//         day: '06',
//         month: 'MAR',
//         category: 'Conférence',
//         title: "F'tor-Débat : Leadership Féminin, Réalités Et Défis",
//         time: '17:30',
//         location: 'Cinéma Renaissance, Rabat',
//         description:
//             'Rencontre exceptionnelle avec Dr Younes Sakkouri, Ministre de l\'Inclusion...',
//         price: 'À partir de 300 DH',
//         imageUrl:
//             'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80',
//     },
//     {
//         id: 5,
//         day: '15',
//         month: 'AVR',
//         category: 'Gala',
//         title: 'Gala Annuel des Lauréats de Belgique',
//         time: '19:00',
//         location: 'Hôtel Sofitel, Casablanca',
//         description:
//             "Célébrez l'excellence et l'amitié maroco-belge lors de notre prestigieux gala annuel. Dîner...",
//         price: 'Sur invitation',
//         imageUrl:
//             'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
//     },
//     {
//         id: 6,
//         day: '28',
//         month: 'MAI',
//         category: 'Networking',
//         title: 'Afterwork B2B : Synergies Économiques',
//         time: '18:30',
//         location: 'The View Hotel, Rabat',
//         description:
//             'Une soirée de réseautage dédiée aux entrepreneurs et cadres dirigeants pour créer de...',
//         price: 'Gratuit pour membres',
//         imageUrl:
//             'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
//     },
// ];

function PinIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-alpha"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function EventCard({ event }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-cl-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            {/* Image section */}
            <div className="relative h-52 w-full overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover"
                />
                {/* Date badge */}
                <div className="absolute top-4 left-4 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-alpha text-cl-white shadow-md">
                    <span className="text-lg leading-none font-bold">
                        {new Date(event.date).toLocaleString('default', {
                            month: 'short',
                        })}
                    </span>
                    <span className="text-[10px] font-semibold uppercase">
                        {new Date(event.date).getDate()}
                    </span>
                </div>
                {/* Category badge */}
                <span className="absolute top-4 right-4 rounded-full bg-cl-white px-3 py-1 text-xs font-semibold text-cl-black shadow-sm">
                    {event.category}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 text-base leading-snug font-bold text-cl-black lg:text-lg">
                    {event.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cl-beta">
                    <span className="flex items-center gap-1">
                        <Clock1Icon width={15} />
                        {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                        <PinIcon />
                        {event.location}
                    </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cl-beta">
                    {event.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm font-bold text-alpha">
                        {event.price}
                    </span>
                    <Link
                        href={`/events/${event.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-cl-black transition hover:text-alpha"
                    >
                        En savoir plus
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function EventsGrid({ events }) {
    // console.log(events)
    return (
        <section className="bg-background pt-2 pb-16 lg:pb-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                        <EventCard key={`${event.id}-${index}`} event={event} />
                    ))}
                </div>

                <div className="mt-14 flex justify-center">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-alpha/30 bg-cl-white px-10 py-3 text-sm font-semibold text-alpha transition hover:bg-alpha hover:text-cl-white"
                    >
                        Charger plus d&apos;événements
                    </button>
                </div>
            </div>
        </section>
    );
}
