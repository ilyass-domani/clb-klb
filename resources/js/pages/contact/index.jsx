import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PageHero from '@/components/PageHero';
import ContactHeroSection from './Partials/ContactHeroSection';
import ContactFormSection from './Partials/ContactFormSection';

function ContactIndex() {
    return (
        <>
            <AppLayout>
                <Head title="Contact" />
                <PageHero subtitle="Parlez-nous" title="Contact" />
                <ContactHeroSection />
                <ContactFormSection />
            </AppLayout>
        </>
    );
}

export default ContactIndex;
