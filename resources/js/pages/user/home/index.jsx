import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import HeroSection from './Partials/HeroSection';
import EventsSection from './Partials/EventsSection';
import StrategicObjectivesSection from './Partials/StrategicObjectivesSection';
import NetworkVideoSection from './Partials/NetworkVideoSection';
import TeamSection from './Partials/TeamSection';
import PartnersSection from './Partials/PartnersSection';

function HomeIndex() {
    return (
        <>
            <AppLayout>
                <Head title="Accueil" />
                <HeroSection />
                <EventsSection />
                <StrategicObjectivesSection />
                <NetworkVideoSection />
                <TeamSection />
                <PartnersSection />
            </AppLayout>
        </>
    );
}

export default HomeIndex;
