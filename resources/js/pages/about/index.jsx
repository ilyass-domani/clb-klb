import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PageHero from '@/components/PageHero';
import WhoWeAreSection from './Partials/WhoWeAreSection';
import VisionSection from './Partials/VisionSection';
import ActivitiesSection from './Partials/ActivitiesSection';
import TeamSection from './Partials/TeamSection';
import PartnersSection from './Partials/PartnersSection';

function AboutIndex() {
    return (
        <>
            <AppLayout>
                <Head title="À propos" />
                <PageHero subtitle="faire connaissance" title="À propos de nous" />
                <WhoWeAreSection />
                <VisionSection />
                <ActivitiesSection />
                <TeamSection />
                <PartnersSection />
            </AppLayout>
        </>
    );
}

export default AboutIndex;
