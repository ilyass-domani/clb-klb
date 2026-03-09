import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

export default function CallToActionSection() {
    return (
        <section className="relative overflow-hidden border-b border-border bg-cl-blue-light/50 py-20 lg:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(232,17,35,0.12),transparent)]" />
            <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                    <TransText
                        fr="Rejoignez le Cercle"
                        ar="انضم إلى الدائرة"
                        nl="Word lid van de Kring"
                        as="span"
                    />
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    <TransText
                        fr="Devenez membre du réseau des diplômés de l'enseignement belge au Maroc et accédez à des opportunités, événements et un réseau d'excellence."
                        ar="انضم إلى شبكة خريجي التعليم البلجيكي في المغرب واستفد من الفرص والفعاليات وشبكة التميز."
                        nl="Word lid van het netwerk van afgestudeerden van het Belgisch onderwijs in Marokko en krijg toegang tot kansen, evenementen en een uitstekend netwerk."
                        as="span"
                    />
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-lg bg-alpha px-8 py-4 text-base font-semibold text-cl-white shadow-lg transition hover:bg-alpha/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-offset-2"
                    >
                        <TransText
                            fr="Devenez membre"
                            ar="انضم كعضو"
                            nl="Word lid"
                            as="span"
                        />
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <Link
                        href="/a-propos"
                        className="inline-flex items-center gap-2 rounded-lg border-2 border-foreground/20 bg-background px-8 py-4 text-base font-semibold text-foreground transition hover:border-alpha hover:bg-alpha/5 hover:text-alpha focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-offset-2"
                    >
                        <TransText
                            fr="En savoir plus"
                            ar="اعرف المزيد"
                            nl="Meer weten"
                            as="span"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
