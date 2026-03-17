import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageHero } from '@/components';
import { WhoWeAreSection, ActivitiesSection, VisionSection } from './partials';
import TeamSection from '@/components/TeamSection';
import PartnersSection from '@/components/PartnersSection';

function AboutIndex({ teamMembers = [], partners = [] }) {
    return (
        <AppLayout>
            <Head title="À propos" />
            <PageHero
                subtitle={{
                    fr: 'faire connaissance',
                    ar: 'تعرف علينا',
                    nl: 'maak kennis',
                }}
                title={{
                    fr: 'À propos de nous',
                    ar: 'عنا',
                    nl: 'Over ons',
                }}
                backgroundImage="/assets/page-hero.webp"
            />
            <WhoWeAreSection />
            <VisionSection />
            <ActivitiesSection />
            <TeamSection teamMembers={teamMembers} />
            <PartnersSection partners={partners} />
        </AppLayout>
    );
}

export default AboutIndex;
