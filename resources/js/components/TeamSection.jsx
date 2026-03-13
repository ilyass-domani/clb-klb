import { TransText, SectionHeader } from '@/components';

function MemberCard({ member }) {
    const imageUrl = member.imageUrl || member.image_path;
    return (
        <article className="group relative flex flex-col overflow-hidden rounded-xl text-center transition-all duration-300">
            <div className="relative mx-auto mt-6 h-28 w-28 shrink-0 overflow-hidden rounded-full sm:h-32 sm:w-32">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={member.name}
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-3xl font-semibold text-muted-foreground sm:text-4xl">
                        {(member.name || ' ').charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col px-4 pt-5 pb-6 sm:px-6 sm:pt-6 sm:pb-8">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {member.name}
                </h3>
                {member.position && (
                    <p className="mt-2 text-sm leading-snug text-muted-foreground">
                        {member.position}
                    </p>
                )}
            </div>
        </article>
    );
}

function MemberCarousel({ title, members }) {
    if (!members.length) return null;
    return (
        <div className="mt-14">
            <p className="text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {title}
            </p>
            <div
                className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-primary/40"
                aria-hidden
            />
            <div className="group/carousel mt-12 overflow-hidden">
                <div className="carousel-loop carousel-loop--slow flex w-max">
                    <div className="flex gap-1 pr-2">
                        {members.map((member) =>
                            member.social_link ? (
                                <a
                                    key={`a-${member.id || member.name}`}
                                    href={member.social_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-70 shrink-0 sm:w-75"
                                >
                                    <MemberCard member={member} />
                                </a>
                            ) : (
                                <div
                                    key={`a-${member.id || member.name}`}
                                    className="w-5 shrink-0 sm:w-75"
                                >
                                    <MemberCard member={member} />
                                </div>
                            ),
                        )}
                    </div>
                    <div className="flex gap-1 pr-2">
                        {members.map((member) =>
                            member.social_link ? (
                                <a
                                    key={`a-${member.id || member.name}`}
                                    href={member.social_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-70 shrink-0 sm:w-75"
                                >
                                    <MemberCard member={member} />
                                </a>
                            ) : (
                                <div
                                    key={`a-${member.id || member.name}`}
                                    className="w-5 shrink-0 sm:w-75"
                                >
                                    <MemberCard member={member} />
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TeamSection({ teamMembers = [] }) {
    const bureau = teamMembers.filter(
        (m) => (m.category || 'bureau') === 'bureau',
    );
    const honorary = teamMembers.filter((m) => m.category === 'honorary');
    if (bureau.length === 0 && honorary.length === 0) return null;

    return (
        <section className="border-b border-border bg-background py-20 lg:py-28">
            <div className="container">
                <SectionHeader
                    label={{
                        fr: 'Gouvernance',
                        ar: 'الحوكمة',
                        nl: 'Bestuur',
                    }}
                    title={{
                        fr: 'Notre Équipe',
                        ar: 'فريقنا',
                        nl: 'Ons team',
                    }}
                    nosplitter
                />
                <TransText
                    fr="Les femmes et hommes qui font vivre le Cercle au quotidien."
                    ar="النساء والرجال الذين يحيون الدائرة يومياً."
                    nl="De mensen die de Kring dagelijks doen leven."
                    as="p"
                    className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground"
                />

                {bureau.length > 0 && (
                    <MemberCarousel
                        title={
                            <TransText
                                fr="Membres du bureau"
                                ar="أعضاء المكتب"
                                nl="Bureau-leden"
                                as="span"
                            />
                        }
                        members={bureau}
                    />
                )}

                {honorary.length > 0 && (
                    <div className="mt-20 border-t border-border pt-16">
                        <MemberCarousel
                            title={
                                <TransText
                                    fr={"Membres d'honneur"}
                                    ar="أعضاء الشرف"
                                    nl="Ereleden"
                                    as="span"
                                />
                            }
                            members={honorary}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
