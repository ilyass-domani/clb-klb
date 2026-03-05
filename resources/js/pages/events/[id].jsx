import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import EventDetailHero from './partials/EventDetailHero';
import EventDetailContent from './partials/EventDetailContent';

function EventShow({ event }) {
  

    return (
        <>
            <AppLayout>
                <Head title={event.title || 'Événement'} />
                <main className="bg-background">
                    <EventDetailHero event={event} />
                    <EventDetailContent event={event} />
                </main>
            </AppLayout>
        </>
    );
}

export default EventShow;

