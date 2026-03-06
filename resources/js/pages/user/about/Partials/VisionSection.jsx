import { usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';
import VisionCard from './VisionCard';

const LOCALES = ['fr', 'ar', 'nl'];
const DEFAULT = 'fr';

function pick(obj, locale) {
    if (obj == null || typeof obj !== 'object') return obj;
    const loc = LOCALES.includes(locale) ? locale : DEFAULT;
    return obj[loc] ?? obj.fr ?? obj.ar ?? obj.nl ?? '';
}

const connectIcon = (
    <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

const dialogIcon = (
    <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);

const learnIcon = (
    <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

const values = [
    {
        icon: connectIcon,
        subtitle: { fr: 'Se connaître', ar: 'التعارف', nl: 'Elkaar leren kennen' },
        description: { fr: "Nous facilitons le modèle de réseau de nos membres afin qu'elles puissent s'épanouir en ayant des opportunités d'affaires et se connaître mutuellement.", ar: "نسهل نموذج الشبكة لأعضائنا حتى يزدهرن ويحصلن على فرص أعمال ويتعارفن.", nl: "We vergemakkelijken het netwerkmodel voor onze leden zodat zij kunnen bloeien met zakelijke kansen en elkaar leren kennen." },
    },
    {
        icon: dialogIcon,
        subtitle: { fr: 'Dialoguer', ar: 'الحوار', nl: 'Dialoog' },
        description: { fr: 'Nous encourageons et soutenons le dialogue et le partage entre nos membres, afin de promouvoir le leadership des femmes.', ar: 'نشجع وندعم الحوار والمشاركة بين أعضائنا لتعزيز القيادة النسائية.', nl: 'We moedigen dialoog en uitwisseling tussen onze leden aan om vrouwelijk leiderschap te bevorderen.' },
    },
    {
        icon: learnIcon,
        subtitle: { fr: 'Prendre connaissance', ar: 'الاطلاع', nl: 'Kennis nemen' },
        description: { fr: "Nous offrons des opportunités de formation et de mentorat pour le développement de nos membres.", ar: "نقدم فرص التدريب والإرشاد لتطوير أعضائنا.", nl: "We bieden opleidings- en mentoringskansen voor de ontwikkeling van onze leden." },
    },
];

export default function VisionSection() {
    const { props } = usePage();
    const locale = props.locale && LOCALES.includes(props.locale) ? props.locale : DEFAULT;
    const valuesWithLocale = values.map((v) => ({
        icon: v.icon,
        subtitle: pick(v.subtitle, locale),
        description: pick(v.description, locale),
    }));

    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <p className="text-center text-sm font-medium uppercase tracking-wider text-alpha">
                    <TransText fr="NOTRE MISSION" ar="مهمتنا" nl="ONZE MISSIE" as="span" />
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold text-foreground lg:text-4xl">
                    <TransText fr="Notre vision" ar="رؤيتنا" nl="Onze visie" as="span" />
                </h2>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {valuesWithLocale.map((item, i) => (
                        <VisionCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
