import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import HeroSection from './partials/HeroSection';
import EventsSection from './partials/EventsSection';
import StrategicObjectivesSection from './partials/StrategicObjectivesSection';
import NetworkVideoSection from './partials/NetworkVideoSection';
import TeamSection from '@/components/TeamSection';
import PartnersSection from '@/components/PartnersSection';
import CallToActionSection from './partials/CallToActionSection';
import ContactStripSection from './partials/ContactStripSection';
import LatestBlogSection from './partials/LatestBlogSection';

function HomeIndex({
    latestBlogs,
    recentEvents = [],
    teamMembers = [],
    partners = [],
}) {
    return (
        <>
            <Head title="Accueil" />
            <HeroSection />
            <EventsSection recentEvents={recentEvents} />
            <StrategicObjectivesSection />
            <NetworkVideoSection />
            <LatestBlogSection latestBlogs={latestBlogs} />
            <TeamSection teamMembers={teamMembers} />
            <PartnersSection partners={partners} />
            <CallToActionSection />
            <ContactStripSection />
        </>
    );
}

HomeIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
export default HomeIndex;
