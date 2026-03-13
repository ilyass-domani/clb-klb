import { Link } from '@inertiajs/react';
import { TransText } from '@/components';
import { GOOGLE_FORM_URL } from '@/lib/consts';

export function CallToActionSection() {
    return (
        <section className="relative overflow-hidden border-b border-border bg-cl-blue-light/50 py-20 lg:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(232,17,35,0.12),transparent)]" />
            <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
                <TransText
                    fr="Rejoignez le Cercle"
                    ar="انضم إلى الدائرة"
                    nl="Word lid van de Kring"
                    as="h2"
                    className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl"
                />
                <TransText
                    fr="Devenez membre du réseau des diplômés de l'enseignement belge au Maroc et accédez à des opportunités, événements et un réseau d'excellence."
                    ar="انضم إلى شبكة خريجي التعليم البلجيكي في المغرب واستفد من الفرص والفعاليات وشبكة التميز."
                    nl="Word lid van het netwerk van afgestudeerden van het Belgisch onderwijs in Marokko en krijg toegang tot kansen, evenementen en een uitstekend netwerk."
                    as="p"
                    className="mt-4 text-lg text-muted-foreground"
                />
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <a
                        href={GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-alpha px-12 py-4 text-sm font-semibold text-cl-white uppercase transition hover:bg-alpha/95"
                    >
                        <TransText
                            fr="Devenez membre"
                            ar="انضم كعضو"
                            nl="Word lid"
                        />
                    </a>
                    <Link
                        href="/a-propos"
                        className="rounded-full border border-black/25 px-12 py-4 text-sm font-semibold text-black uppercase transition hover:bg-white/25"
                    >
                        <TransText
                            fr="En savoir plus"
                            ar="اعرف المزيد"
                            nl="Meer weten"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CallToActionSection;
