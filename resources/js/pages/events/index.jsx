import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import EventsHero from './partials/EventsHero';
import EventsToolbar from './partials/EventsToolbar';
import EventsGrid from './partials/EventsGrid';

function EventsIndex({events}) {
    // console.log(events);
    return (
        <>
            <AppLayout>
                <Head title="Nos événements" />
                <main className="bg-background">
                    <EventsHero />
                    <EventsToolbar />
                    <EventsGrid events={events} />
                </main>
            </AppLayout>
        </>
    );
}

export default EventsIndex;

