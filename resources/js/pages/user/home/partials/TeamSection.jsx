import TransText from '@/components/TransText';

const team = [
    { name: 'Abdessamad Ben Moumen', imageUrl: '/images/team/Abdessamad-Ben-Moumen.jpg' },
    { name: 'Chiraz', imageUrl: '/images/team/Chiraz-Delegation-Wallonie-Bruxelles.jpg' },
    { name: 'Driss El Yazami', imageUrl: '/images/team/Driss-ElYazami.jpg' },
    { name: 'François De Vrije', imageUrl: '/images/team/François-DeVrije-Hub-Brussels.jpg' },
    { name: 'Gilles Heyvaert', imageUrl: '/images/team/Gilles-Heyvaert-Ambassadeur.jpg' },
    { name: 'Merouane Touali', imageUrl: '/images/team/Merouane-Touali.jpg' },
    { name: 'Mohamed Rhachi', imageUrl: '/images/team/Mohamed-Rhachi-Universite-Mohammed-V.jpg' },
    { name: 'Nadia Sentissi', imageUrl: '/images/team/Nadia-Sentissi.jpg' },
    { name: 'Sarah Bentefrit', imageUrl: '/images/team/Sarah-Bentefrit.jpg' },
];

export default function TeamSection() {
    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <p className="text-center text-sm font-medium uppercase tracking-wider text-cl-beta">
                    <TransText fr="La gouvernance du CLB" ar="حوكمة CLB" nl="Het bestuur van CLB" as="span" />
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold text-foreground lg:text-4xl">
                    <TransText fr="Notre Équipe" ar="فريقنا" nl="Ons team" as="span" />
                </h2>
                <div className="mt-12 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                    {team.map((member, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-border bg-muted sm:h-32 sm:w-32">
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <p className="mt-3 font-bold text-foreground">{member.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
