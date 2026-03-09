import { TransText, SectionHeader } from '@/components';

function PartnerLogo({ partner }) {
    const logoUrl = partner.logoUrl ?? partner.logo_path;
    return (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
            <img
                src={logoUrl}
                alt=""
                className="max-h-full max-w-full object-contain opacity-80 transition duration-300 hover:opacity-100"
            />
        </div>
    );
}

export default function PartnersSection({ partners = [] }) {
    if (partners.length === 0) return null;
    return (
        <section className="border-b border-border bg-background py-20 lg:py-28">
            <div className="mx-auto max-w-6xl px-4 lg:px-6">
                <SectionHeader
                    label={{
                        fr: 'Nos partenaires',
                        ar: 'شركاؤنا',
                        nl: 'Onze partners',
                    }}
                    title={{
                        fr: 'Nos partenaires',
                        ar: 'شركاؤنا',
                        nl: 'Onze partners',
                    }}
                />
                <div className="group/carousel mt-14 overflow-hidden">
                    <div className="carousel-loop carousel-loop--slow flex w-max">
                        <div className="flex items-center gap-20 pr-20">
                            {partners.map((partner, i) => (
                                <PartnerLogo
                                    key={`a-${partner.id ?? i}`}
                                    partner={partner}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-20 pr-20">
                            {partners.map((partner, i) => (
                                <PartnerLogo
                                    key={`b-${partner.id ?? i}`}
                                    partner={partner}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
