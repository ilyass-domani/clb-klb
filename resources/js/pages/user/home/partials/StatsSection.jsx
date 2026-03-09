import TransText from '@/components/TransText';

const stats = [
    {
        value: '500+',
        label: { fr: 'Membres', ar: 'عضو', nl: 'Leden' },
    },
    {
        value: '50+',
        label: { fr: 'Événements', ar: 'فعالية', nl: 'Evenementen' },
    },
    {
        value: '10+',
        label: { fr: 'Partenaires', ar: 'شريك', nl: 'Partners' },
    },
    {
        value: '100+',
        label: { fr: 'Années d\'expertise', ar: 'سنوات الخبرة', nl: 'Jaren ervaring' },
    },
];

export default function StatsSection() {
    return (
        <section className="relative border-b border-border bg-cl-black py-12 lg:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(232,17,35,0.08),transparent)]" />
            <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="text-center"
                        >
                            <p className="text-3xl font-extrabold tracking-tight text-alpha sm:text-4xl lg:text-5xl">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-cl-white/80">
                                <TransText fr={stat.label.fr} ar={stat.label.ar} nl={stat.label.nl} as="span" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
