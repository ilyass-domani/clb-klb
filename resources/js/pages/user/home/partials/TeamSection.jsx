import TransText from '@/components/TransText';

const team = [
    { name: 'Mariam Talal', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
    { name: 'Othmane Lahlou', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    { name: 'Anass Boufous', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    { name: 'Amine Belfakir', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
    { name: 'Yassine El Khattabi', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
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
                                    alt=""
                                    className="h-full w-full object-cover"
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
