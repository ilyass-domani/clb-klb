import { Link } from '@inertiajs/react';
import { TransText } from '@/components';

export default function HeroSection() {
    return (
        <section className="relative flex min-h-[62.5vh] items-center justify-center bg-cl-black/75 px-4 py-24">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(/assets/hero-bg.webp)`,
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(to right, rgba(32, 18, 19, 0.625) 0%, rgba(32, 18, 19, 0.75) 50%, rgba(32, 18, 19, 0.625) 100%)',
                }}
            />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <TransText
                    fr="Le Cercle des Lauréats de Belgique"
                    ar="دائرة خريجي بلجيكا"
                    nl="De Kring van Belgische Laureaten"
                    as="h1"
                    className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-cl-white sm:text-5xl lg:text-6xl xl:text-7xl"
                />
                <TransText
                    fr="Le réseau des diplômés de l'enseignement belge au Maroc. Nous fédérons les talents, créons des opportunités et renforçons les liens entre la Belgique et le Maroc."
                    ar="شبكة خريجي التعليم البلجيكي في المغرب. نوحد المواهب ونخلق الفرص ونوطد العلاقات بين بلجيكا والمغرب."
                    nl="Het netwerk van afgestudeerden van het Belgisch onderwijs in Marokko. We verbinden talenten, creëren kansen en versterken de banden tussen België en Marokko."
                    as="span"
                    className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-cl-white/95 sm:text-lg lg:text-xl"
                />
                <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/a-propos"
                        className="rounded-full bg-alpha px-12 py-4 text-sm font-semibold text-cl-white transition hover:bg-alpha/85"
                    >
                        <TransText
                            fr="EN SAVOIR PLUS"
                            ar="اعرف المزيد"
                            nl="MEER WETEN"
                        />
                    </Link>
                    <Link
                        href="/contact"
                        className="rounded-full border border-cl-white px-12 py-4 text-sm font-semibold text-cl-white uppercase transition hover:bg-cl-white/5"
                    >
                        <TransText
                            fr="contactez-nous"
                            ar="اتصل بنا"
                            nl="CONTACTEER ONS"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
