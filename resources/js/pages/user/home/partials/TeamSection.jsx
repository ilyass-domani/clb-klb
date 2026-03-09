import { usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';

const LOCALES = ['fr', 'ar', 'nl'];
const DEFAULT = 'fr';

function pick(obj, locale) {
    if (obj == null || typeof obj !== 'object') return obj;
    const loc = LOCALES.includes(locale) ? locale : DEFAULT;
    return obj[loc] ?? obj.fr ?? obj.ar ?? obj.nl ?? '';
}

const team = [
    {
        name: 'Merouane TOUALI',
        position: {
            fr: 'Président',
            ar: 'الرئيس',
            nl: 'Voorzitter',
        },
        imageUrl: 'assets/team/clb-klb-team-3.webp',
    },
    {
        name: 'Ali SERHROUCHNI',
        position: {
            fr: 'Vice-Président',
            ar: 'نائب الرئيس',
            nl: 'Vice-Voorzitter',
        },
        imageUrl: 'assets/team/clb-klb-team-1.webp',
    },
    {
        name: 'Souad jamai',
        position: {
            fr: 'Assesseure',
            ar: 'عضوة المجلس',
            nl: 'Bestuurder',
        },
        imageUrl: 'assets/team/clb-klb-team-4.webp',
    },
    {
        name: 'Christian JONNIAUX',
        position: {
            fr: 'Trésorier',
            ar: 'الخزينة',
            nl: 'Penningmeester',
        },
        imageUrl: 'assets/team/clb-klb-team-2.webp',
    },
    {
        name: 'Gregory VAN BELLINGHEN',
        position: {
            fr: 'Secrétaire Général',
            ar: 'السكرتير العام',
            nl: 'Algemene secretaris',
        },
        imageUrl: 'assets/team/clb-klb-team-0.webp',
    },
];

export default function TeamSection() {
    const { props } = usePage();
    const locale = props.locale && LOCALES.includes(props.locale) ? props.locale : DEFAULT;

    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <p className="text-center text-xs font-medium tracking-wider text-alpha uppercase">
                    <TransText
                        fr="nos gouvernance"
                        ar="حكومتنا"
                        nl="Ons bestuur"
                    />
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold text-foreground lg:text-4xl">
                    <TransText fr="Notre Équipe" ar="فريقنا" nl="Ons team" />
                </h2>
                <div className="mt-12 grid grid-cols-2 items-center justify-center gap-4 lg:grid-cols-5 lg:gap-4">
                    {team.map((member, i) => (
                        <div key={i} className="flex flex-col text-center">
                            <div className="group relative aspect-3/5 overflow-hidden transition-all">
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="size-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 flex size-full items-end justify-center gap-2 bg-linear-to-t from-black/75 to-transparent p-6 text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                                    <a href="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            fill="currentColor"
                                            className="size-7 fill-white"
                                        >
                                            <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z" />
                                        </svg>
                                    </a>
                                    <a href="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            fill="currentColor"
                                            className="size-7 fill-white"
                                        >
                                            <path d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <p className="mt-3 font-bold text-foreground">
                                {member.name}
                            </p>
                            <TransText
                                fr={member.position.fr}
                                ar={member.position.ar}
                                nl={member.position.nl}
                                as="p"
                                className="font-medium text-cl-beta"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
