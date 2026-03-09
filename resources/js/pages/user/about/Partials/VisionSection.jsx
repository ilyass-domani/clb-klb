import { SectionHeader } from '@/components';
import ObjectiveBlock from '../../home/partials/ObjectiveBlock';

const objectives = [
    {
        iconKey: 'connect',
        title: {
            fr: 'Se connaître',
            ar: 'التعارف',
            nl: 'Elkaar leren kennen',
        },
        description: {
            fr: "Nous facilitons le modèle de réseau de nos membres afin qu'elles puissent s'épanouir en ayant des opportunités d'affaires et se connaître mutuellement.",
            ar: 'نسهل نموذج الشبكة لأعضائنا حتى يزدهرن ويحصلن على فرص أعمال ويتعارفن.',
            nl: 'We vergemakkelijken het netwerkmodel voor onze leden zodat zij kunnen bloeien met zakelijke kansen en elkaar leren kennen.',
        },
    },
    {
        iconKey: 'dialog',
        title: { fr: 'Dialoguer', ar: 'الحوار', nl: 'Dialoog' },
        description: {
            fr: 'Nous encourageons et soutenons le dialogue et le partage entre nos membres, afin de promouvoir le leadership des femmes.',
            ar: 'نشجع وندعم الحوار والمشاركة بين أعضائنا لتعزيز القيادة النسائية.',
            nl: 'We moedigen dialoog en uitwisseling tussen onze leden aan om vrouwelijk leiderschap te bevorderen.',
        },
    },
    {
        iconKey: 'learn',
        title: {
            fr: 'Prendre connaissance',
            ar: 'الاطلاع',
            nl: 'Kennis nemen',
        },
        description: {
            fr: 'Nous offrons des opportunités de formation et de mentorat pour le développement de nos membres.',
            ar: 'نقدم فرص التدريب والإرشاد لتطوير أعضائنا.',
            nl: 'We bieden opleidings- en mentoringskansen voor de ontwikkeling van onze leden.',
        },
    },
];

export default function VisionSection() {
    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <SectionHeader
                    label={{
                        fr: 'Nos Missions',
                        ar: 'مهامنا',
                        nl: 'Onze missies',
                    }}
                    title={{
                        fr: 'Notre Vision',
                        ar: 'رؤيتنا',
                        nl: 'Onze visie',
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
