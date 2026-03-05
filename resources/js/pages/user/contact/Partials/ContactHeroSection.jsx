import { Phone, MapPin, Mail } from 'lucide-react';
import TransText from '@/components/TransText';

const contactCards = [
    {
        icon: Phone,
        title: { fr: 'TÉLÉPHONE', ar: 'الهاتف', nl: 'TELEFOON' },
        subtitle: { fr: 'Du lundi au vendredi de 9h à 18h.', ar: 'من الاثنين إلى الجمعة من 9 صباحاً حتى 6 مساءً.', nl: 'Maandag tot vrijdag van 9u tot 18u.' },
        value: '+212 6 66 17 47 12',
        type: 'phone',
    },
    {
        icon: MapPin,
        title: { fr: 'ADRESSE', ar: 'العنوان', nl: 'ADRES' },
        subtitle: { fr: 'Venez nous rencontrer.', ar: 'تعالوا لزيارتنا.', nl: 'Kom ons ontmoeten.' },
        value: '4, Rue Jaâfar Assadik - Agdal, Rabat - Maroc',
        type: 'address',
    },
    {
        icon: Mail,
        title: { fr: 'E-MAIL', ar: 'البريد الإلكتروني', nl: 'E-MAIL' },
        subtitle: { fr: 'Notre équipe vous répondra rapidement.', ar: 'سيرد فريقنا بسرعة.', nl: 'Ons team antwoordt u snel.' },
        value: 'contact@clb-klb.com',
        type: 'email',
    },
];

export default function ContactHeroSection() {
    return (
        <section className="bg-cl-blue-light px-4 pt-24 pb-16 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                    <TransText
                        fr="Ne cherchez pas sur Google, demandez-nous"
                        ar="لا تبحث في غوغل، اسألنا"
                        nl="Zoek niet op Google, vraag het ons"
                        as="span"
                    />
                </h1>
                <p className="mt-4 max-w-2xl text-foreground/90">
                    <TransText
                        fr="Une question, une suggestion ou une envie de rejoindre notre réseau ? N'hésitez pas à nous écrire, notre équipe est là pour vous écouter."
                        ar="سؤال، اقتراح أو رغبة في الانضمام إلى شبكتنا؟ لا تتردد في الكتابة إلينا، فريقنا في خدمتك."
                        nl="Een vraag, suggestie of zin om bij ons netwerk te komen? Schrijf ons gerust, ons team staat voor u klaar."
                        as="span"
                    />
                </p>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                    {contactCards.map(({ icon: Icon, title, subtitle, value, type }) => (
                        <div
                            key={type}
                            className="rounded-xl border border-border bg-card p-6 shadow-sm"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-alpha text-cl-white">
                                <Icon className="h-5 w-5" aria-hidden />
                            </div>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-foreground">
                                <TransText fr={title.fr} ar={title.ar} nl={title.nl} as="span" />
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                <TransText fr={subtitle.fr} ar={subtitle.ar} nl={subtitle.nl} as="span" />
                            </p>
                            <p className="mt-2 font-semibold text-foreground">
                                {type === 'email' ? (
                                    <a href={`mailto:${value}`} className="hover:underline">
                                        {value}
                                    </a>
                                ) : type === 'phone' ? (
                                    <a href={`tel:${value.replace(/\s/g, '')}`} className="hover:underline">
                                        {value}
                                    </a>
                                ) : (
                                    value
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
