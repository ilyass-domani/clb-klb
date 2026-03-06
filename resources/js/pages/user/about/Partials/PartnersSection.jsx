import TransText from '@/components/TransText';

const partners = [
    { name: 'AIM', logoUrl: '/images/partners/AIM-Logo.png' },
    { name: 'Ali Zaoua', logoUrl: '/images/partners/Ali-Zaoua-Logo.jpg' },
    { name: 'Ambassade Belgique Maroc', logoUrl: '/images/partners/Ambassade-Belgique-Maroc.jpg' },
    { name: 'CME Africa', logoUrl: '/images/partners/CME-Africa.png' },
    { name: 'Enabel', logoUrl: '/images/partners/Enabel_Logo_Color_RGB.jpg' },
    { name: 'ESCA', logoUrl: '/images/partners/ESCA.png' },
    { name: 'Génération Libre', logoUrl: '/images/partners/Generation-Libre-Logo.jpg' },
    { name: 'LionsGeek', logoUrl: '/images/partners/LionsGeek_logo.jfif' },
    { name: 'DGWB Maroc', logoUrl: '/images/partners/Logo_DGWB_MAROC_Vertical_Couleur.png' },
    { name: '2M', logoUrl: '/images/partners/Logo-2M.png' },
    { name: 'APEFE', logoUrl: '/images/partners/Logo-APEFE.png' },
    { name: 'CCBLM', logoUrl: '/images/partners/logo-ccblm-header.png' },
    { name: 'CCME', logoUrl: '/images/partners/Logo-CCME.jpg' },
    { name: 'Min Ajliki', logoUrl: '/images/partners/Logo-Min-Ajliki.png' },
    { name: 'UIR Com & Médias', logoUrl: '/images/partners/Logo-UIR-Com-Medias.png' },
    { name: 'ULg CEDEM', logoUrl: '/images/partners/Logo-ULg-CEDEM.png' },
    { name: 'Wafin Europe', logoUrl: '/images/partners/Logo-Wafin-Europe-AISBL.jpg' },
    { name: 'Moussem', logoUrl: '/images/partners/Moussem-Logo.png' },
    { name: 'UIR University', logoUrl: '/images/partners/UIR-University.jfif' },
    { name: 'UMP Oujda', logoUrl: '/images/partners/UMP-Oujda.jpg' },
    { name: 'CJD Maroc', logoUrl: '/images/partners/Logo-CJD-Maroc.jpg' },
];

function PartnerLogo({ partner }) {
    return (
        <div className="flex h-24 w-[calc(25%-1.5rem)] flex-shrink-0 items-center justify-center rounded-lg border border-border bg-card p-4 sm:h-32 lg:h-36">
            <img
                src={partner.logoUrl}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
            />
        </div>
    );
}

export default function PartnersSection() {
    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <p className="text-center text-sm font-medium uppercase tracking-wider text-alpha">
                    <TransText fr="OCÉAN DES MARQUES" ar="بحر العلامات" nl="OCEAN VAN MERKEN" as="span" />
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold text-foreground lg:text-4xl">
                    <TransText fr="Nos Partenaires" ar="شركاؤنا" nl="Onze partners" as="span" />
                </h2>
            </div>
            <div className="mx-auto mt-12 max-w-7xl overflow-hidden px-4 lg:px-8">
                <div className="flex animate-[scroll_15s_linear_infinite] gap-8">
                    {partners.map((partner, i) => (
                        <PartnerLogo key={`a-${i}`} partner={partner} />
                    ))}
                    {partners.map((partner, i) => (
                        <PartnerLogo key={`b-${i}`} partner={partner} />
                    ))}
                </div>
            </div>
        </section>
    );
}
