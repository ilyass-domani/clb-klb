import TransText from '@/components/TransText';

const partners = [
    { name: 'Partner 1', logoUrl: null },
    { name: 'Partner 2', logoUrl: null },
    { name: 'Partner 3', logoUrl: null },
    { name: 'Partner 4', logoUrl: null },
];

export default function PartnersSection() {
    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <p className="text-center text-sm font-medium tracking-wider text-alpha uppercase">
                    <TransText
                        fr="OCÉAN DES MARQUES"
                        ar="بحر العلامات"
                        nl="OCEAN VAN MERKEN"
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
                            className="flex h-16 w-24 items-center justify-center rounded border border-border bg-card px-4 py-3 sm:h-20 sm:w-28"
                        >
                            {partner.logoUrl ? (
                                <img
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    className="max-h-full max-w-full object-contain"
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
