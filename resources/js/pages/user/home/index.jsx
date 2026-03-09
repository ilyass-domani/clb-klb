import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import HeroSection from './partials/HeroSection';
import StatsSection from './partials/StatsSection';
import EventsSection from './partials/EventsSection';
import StrategicObjectivesSection from './partials/StrategicObjectivesSection';
import NetworkVideoSection from './partials/NetworkVideoSection';
import TeamSection from './partials/TeamSection';
import PartnersSection from './partials/PartnersSection';
import CallToActionSection from './partials/CallToActionSection';
import ContactStripSection from './partials/ContactStripSection';
import LatestBlogSection from './partials/LatestBlogSection';


function HomeIndex({ latestBlogs }) {
    return (
        <>
            <Head title="Accueil" />
            <HeroSection />
            <StatsSection />
            <EventsSection />
            <StrategicObjectivesSection />
            <NetworkVideoSection />
            <LatestBlogSection latestBlogs={latestBlogs} />
            <TeamSection />
            <PartnersSection />
            <CallToActionSection />
            <ContactStripSection />
        </>
    );
}

HomeIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
export default HomeIndex;
