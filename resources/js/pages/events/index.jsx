import { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import EventsHero from './partials/EventsHero';
import EventsToolbar from './partials/EventsToolbar';
import EventsGrid from './partials/EventsGrid';

/** Normalize category string to slug for comparison (e.g. "Conférence" -> "conference"). */
function categoryToSlug(categorie) {
    if (!categorie) return '';
    const raw = typeof categorie === 'string' ? categorie : (categorie.fr ?? categorie.ar ?? categorie.nl ?? '');
    return raw
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/\s+/g, '');
}

function EventsIndex({ events }) {
    const [statusFilter, setStatusFilter] = useState('upcoming');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const filteredEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return (events ?? []).filter((event) => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            const isUpcoming = eventDate >= today;

            if (statusFilter === 'upcoming' && !isUpcoming) return false;
            if (statusFilter === 'past' && isUpcoming) return false;

            if (categoryFilter !== 'all') {
                const slug = categoryToSlug(event.categorie);
                if (slug !== categoryFilter) return false;
            }

            return true;
        });
    }, [events, statusFilter, categoryFilter]);

    return (
        <>
            <AppLayout>
                <Head title="Nos événements" />
                <main className="bg-background">
                    <EventsHero />
                    <EventsToolbar
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        categoryFilter={categoryFilter}
                        onCategoryChange={setCategoryFilter}
                    />
                    <EventsGrid events={filteredEvents} />
                </main>
            </AppLayout>
        </>
    );
}

export default EventsIndex;

