import TransText from '@/components/TransText';

const partners = [
    { name: 'APEFE', logoUrl: 'assets/partners/apefe.png' },
    { name: 'LIONSGEEK', logoUrl: 'assets/partners/lionsgeek.webp' },
    { name: 'WB-EBM', logoUrl: 'assets/partners/wallonie-bruxelles-ebm.webp' },
    {
        name: 'WALLONIE-BRUXELLES',
        logoUrl: 'assets/partners/wallonie-bruxelles.webp',
    },
    { name: 'LIEGE', logoUrl: 'assets/partners/liege.webp' },
    { name: 'ULB', logoUrl: 'assets/partners/ulb.webp' },
];

function PartnerLogo({ partner, index }) {
    return (
        <div
            className="flex h-20 w-28 shrink-0 items-center justify-center rounded-xl border border-border bg-card px-6 py-4 shadow-sm transition hover:border-alpha/30 hover:shadow-md sm:h-24 sm:w-32"
            key={index}
        >
            {partner.logoUrl ? (
                <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain grayscale transition hover:grayscale-0"
                />
            ) : (
                <span className="text-center text-base font-bold text-muted-foreground transition hover:text-foreground">
                    {partner.name}
                </span>
            )}
        </div>
    );
}

export default function PartnersSection() {
    return (
        <section className="border-b border-border bg-cl-blue-light/30 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <p className="text-center text-xs font-medium tracking-wider text-alpha uppercase">
                    <TransText
                        fr="Nos Partenaires"
                        ar="شركاؤنا"
                        nl="Onze partners"
                        as="span"
                    />
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold text-foreground lg:text-4xl">
                    <TransText
                        fr="Nos Partenaires"
                        ar="شركاؤنا"
                        nl="Onze partners"
                        as="span"
                    />
                </h2>
                <div className="mt-12 flex flex-wrap items-center justify-center gap-12 grayscale">
                    {partners.map((partner, i) => (
                        <div
                            key={i}
                            className="flex h-20 w-28 items-center justify-center md:h-24 md:w-32 lg:h-28 lg:w-36"
                        >
                            {partner.logoUrl ? (
                                <img
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    className="max-h-full max-w-full"
                                />
                            ) : (
                                <span className="text-lg font-semibold text-muted-foreground">
                                    {partner.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
