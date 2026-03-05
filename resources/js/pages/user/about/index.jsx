import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PageHero from '@/components/PageHero';
import TransText from '@/components/TransText';
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
                <PageHero
                    subtitle={<TransText fr="faire connaissance" ar="تعرف علينا" nl="maak kennis" />}
                    title={<TransText fr="À propos de nous" ar="عنا" nl="Over ons" />}
                />
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
