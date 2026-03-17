import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageHero } from '@/components';
import ContactHeroSection from './Partials/ContactHeroSection';
import ContactFormSection from './Partials/ContactFormSection';

function ContactIndex() {
    return (
        <>
            <AppLayout>
                <Head title="Contact" />
                <PageHero
                    subtitle={{
                        fr: 'Parlez-nous',
                        ar: 'تواصل معنا',
                        nl: 'Spreek met ons',
                    }}
                    title={{
                        fr: 'Contact',
                        ar: 'اتصل بنا',
                        nl: 'Contact',
                    }}
                    backgroundImage="/assets/page-hero.webp"
                />
                <ContactHeroSection />
                <ContactFormSection />
            </AppLayout>
        </>
    );
}

export default ContactIndex;
