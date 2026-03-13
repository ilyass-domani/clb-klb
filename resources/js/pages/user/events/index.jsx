import { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {  EventsToolbar, EventsGrid } from './partials';
import { PageHero } from '@/components';

/** Normalize category string to slug for comparison (e.g. "Conférence" -> "conference"). */
function categoryToSlug(category) {
    if (!category) return '';
    const raw =
        typeof category === 'string'
            ? category
            : (category.fr ?? category.ar ?? category.nl ?? '');
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
                const slug = categoryToSlug(event.category);
                if (slug !== categoryFilter) return false;
            }

            return true;
        });
    }, [events, statusFilter, categoryFilter]);

    return (
        <AppLayout>
            <Head title="Nos événements" />
            <main className="bg-background">
                <PageHero
                    title={{
                        fr: 'NOS ÉVÉNEMENTS',
                        ar: 'فعالياتنا',
                        nl: 'ONZE EVENEMENTEN',
                    }}
                    subtitle={{
                        fr: 'Découvrez nos rencontres, conférences et galas exclusifs dédiés au réseau ',
                        ar: 'اكتشفوا لقاءاتنا ومؤتمراتنا وحفلاتنا الحصرية المخصصة للشبكة',
                        nl: "Ontdek onze bijeenkomsten, conferenties en exclusieve gala's gewijd aan het netwerk",
                    }}
                    reverse
                    backgroundImage="assets/page-hero.webp"
                />
                <EventsToolbar
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    categoryFilter={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                />
                <EventsGrid events={filteredEvents} />
            </main>
        </AppLayout>
    );
}

export default EventsIndex;
