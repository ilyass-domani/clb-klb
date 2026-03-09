import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PageHero from '@/components/PageHero';
import TransText from '@/components/TransText';
import ContactHeroSection from './Partials/ContactHeroSection';
import ContactFormSection from './Partials/ContactFormSection';

function ContactIndex({ contact }) {
    console.log(contact);

    return (
        <>
            <AppLayout>
                <Head title="Contact" />
                <PageHero
                    subtitle={
                        <TransText
                            fr="Parlez-nous"
                            ar="تواصل معنا"
                            nl="Spreek met ons"
                        />
                    }
                    title={
                        <TransText fr="Contact" ar="اتصل بنا" nl="Contact" />
                    }
                />
                <ContactHeroSection />
                <ContactFormSection />
            </AppLayout>
        </>
    );
}

export default ContactIndex;
