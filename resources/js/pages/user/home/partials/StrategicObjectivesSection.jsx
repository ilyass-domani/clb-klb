import { SectionHeader } from '@/components';
import ObjectiveBlock from './ObjectiveBlock';

const objectives = [
    {
        iconKey: 'promote',
        title: {
            fr: 'PROMOUVOIR LES ÉTUDES',
            ar: 'تعزيز الدراسة',
            nl: 'STUDIES PROMOTEN',
        },
        description: {
            fr: "Mettre en valeur les parcours et les diplômes de l'enseignement belge au Maroc.",
            ar: 'إبراز المسارات وشهادات التعليم البلجيكي في المغرب.',
            nl: "De trajecten en diploma's van het Belgisch onderwijs in Marokko in de kijker zetten.",
        },
    },
    {
        iconKey: 'federate',
        title: { fr: 'FÉDÉRER', ar: 'توحيد', nl: 'FEDEREREN' },
        description: {
            fr: 'Rassembler les lauréats et créer une communauté soudée et engagée.',
            ar: 'جمع الخريجين وخلق مجتمع متماسك وملتزم.',
            nl: 'Laureaten samenbrengen en een hechte, betrokken gemeenschap creëren.',
        },
    },
    {
        iconKey: 'network',
        title: {
            fr: 'DÉVELOPPER UN RÉSEAU',
            ar: 'تطوير الشبكة',
            nl: 'EEN NETWERK ONTWIKKELEN',
        },
        description: {
            fr: "Offrir des opportunités de networking et d'échanges entre membres.",
            ar: 'توفير فرص التواصل وتبادل الخبرات بين الأعضاء.',
            nl: 'Netwerkmogelijkheden en uitwisseling tussen leden bieden.',
        },
    },
    {
        iconKey: 'accompany',
        title: { fr: 'ACCOMPAGNER', ar: 'مرافقة', nl: 'BEGELEIDEN' },
        description: {
            fr: 'Soutenir les membres dans leur insertion professionnelle et leurs projets.',
            ar: 'دعم الأعضاء في الاندماج المهني ومشاريعهم.',
            nl: 'Leden ondersteunen bij hun professionele integratie en projecten.',
        },
    },
    {
        iconKey: 'contribute',
        title: { fr: 'CONTRIBUER', ar: 'المساهمة', nl: 'BIJDRAGEN' },
        description: {
            fr: "Contribuer au rayonnement de l'enseignement belge et au dialogue des cultures.",
            ar: 'المساهمة في إشعاع التعليم البلجيكي وحوار الثقافات.',
            nl: 'Bijdragen aan de uitstraling van het Belgisch onderwijs en de dialoog tussen culturen.',
        },
    },
    {
        iconKey: 'build',
        title: { fr: 'CONSTRUIRE', ar: 'بناء', nl: 'BOUWEN' },
        description: {
            fr: 'Bâtir des partenariats durables avec les institutions et les entreprises.',
            ar: 'بناء شراكات دائمة مع المؤسسات والشركات.',
            nl: 'Duurzame partnerschappen opbouwen met instellingen en bedrijven.',
        },
    },
];

export default function StrategicObjectivesSection() {
    return (
        <section
            id="objectifs"
            className="scroll-mt-20 border-b border-border bg-background py-16 lg:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <SectionHeader
                    label={{
                        fr: 'Nos Missions',
                        ar: 'مهامنا',
                        nl: 'Onze missies',
                    }}
                    title={{
                        fr: 'Nos Objectifs Stratégiques',
                        ar: 'أهدافنا الاستراتيجية',
                        nl: 'Onze strategische doelstellingen',
                    }}
                />
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {objectives.map((obj, i) => (
                        <ObjectiveBlock key={i} {...obj} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
