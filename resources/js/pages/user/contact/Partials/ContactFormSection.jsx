import { useForm, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import TransText from '@/components/TransText';

const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
];

const introText = {
    fr: "Le Club des Diplômées de Belgique au Maroc (CLB) est votre point de contact pour toutes les activités, partenariats ou envies de rejoindre notre réseau. N'hésitez pas à nous écrire.",
    ar: "نادي خريجات بلجيكا في المغرب (CLB) هو نقطة اتصالك لجميع الأنشطة والشراكات أو الرغبة في الانضمام إلى شبكتنا. لا تتردد في الكتابة إلينا.",
    nl: "De Club van Belgische Afgestudeerden in Marokko (CLB) is uw contactpunt voor activiteiten, partnerschappen of om bij ons netwerk te komen. Schrijf ons gerust.",
};

export default function ContactFormSection() {
    const { props } = usePage();
    const locale = props.locale && ['fr', 'ar', 'nl'].includes(props.locale) ? props.locale : 'fr';
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
        });
    }

    return (
        <section className="border-b border-border bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-alpha">
                            <TransText fr="RESTONS CONNECTÉS" ar="لنبق على تواصل" nl="BLIJF VERBONDEN" as="span" />
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-foreground lg:text-4xl">
                            <TransText fr="Contactez-Nous" ar="اتصل بنا" nl="Contacteer ons" as="span" />
                        </h2>
                        <p className="mt-6 leading-relaxed text-foreground/90">
                            <TransText fr={introText.fr} ar={introText.ar} nl={introText.nl} as="span" />
                        </p>
                        <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-alpha">
                            <TransText fr="SUIVEZ-NOUS" ar="تابعنا" nl="VOLG ONS" as="span" />
                        </p>
                        <div className="mt-4 flex gap-4">
                            {socialLinks.map(({ name, href, icon: Icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    className="text-muted-foreground transition hover:text-foreground"
                                    aria-label={name}
                                >
                                    <Icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/50 p-6 shadow-sm lg:p-8">
                        <h3 className="text-xl font-semibold text-foreground">
                            <TransText fr="Envoyez-nous un message" ar="أرسل لنا رسالة" nl="Stuur ons een bericht" as="span" />
                        </h3>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="mb-1 block text-sm font-medium text-foreground"
                                    >
                                        <TransText fr="Nom Complet" ar="الاسم الكامل" nl="Volledige naam" as="span" />
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        placeholder="Jean Dupont"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        autoComplete="name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="mb-1 block text-sm font-medium text-foreground"
                                    >
                                        <TransText fr="E-mail" ar="البريد الإلكتروني" nl="E-mail" as="span" />
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        placeholder="jean@exemple.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="contact-subject"
                                    className="mb-1 block text-sm font-medium text-foreground"
                                >
                                    Sujet
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    placeholder="Objet de votre message"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-destructive">{errors.subject}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-1 block text-sm font-medium text-foreground"
                                >
                                    <TransText fr="Message (optionnel)" ar="الرسالة (اختياري)" nl="Bericht (optioneel)" as="span" />
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={4}
                                    placeholder="Votre message ici..."
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                                )}
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-alpha px-4 py-3 text-sm font-medium uppercase text-cl-white transition hover:opacity-95 disabled:opacity-70 sm:w-auto"
                                >
                                    {processing ? (locale === 'ar' ? 'جاري الإرسال...' : locale === 'nl' ? 'Verzenden...' : 'Envoi...') : (locale === 'ar' ? 'إرسال' : locale === 'nl' ? 'VERSTUREN' : 'ENVOYER')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
