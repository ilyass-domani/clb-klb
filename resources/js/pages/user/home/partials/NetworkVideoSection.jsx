import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import TransText from '@/components/TransText';

const LOCALES = ['fr', 'ar', 'nl'];
const DEFAULT = 'fr';

function pick(obj, locale) {
    if (obj == null || typeof obj !== 'object') return obj;
    const loc = LOCALES.includes(locale) ? locale : DEFAULT;
    return obj[loc] ?? obj.fr ?? obj.ar ?? obj.nl ?? '';
}

const slides = [
    {
        title: {
            fr: 'Un réseau au service des lauréats de Belgique',
            ar: 'شبكة في خدمة خريجي بلجيكا',
            nl: 'Een netwerk ten dienste van Belgische laureaten',
        },
        body: {
            fr: "Plongez au cœur de notre communauté d'anciens élèves et bienfaiteurs. Les CLB-KLB, l'association fédératrice qui vous ouvre les bras sur le Maroc.",
            ar: 'انغمسوا في قلب مجتمعنا من الخريجين والمحسنين. CLB-KLB، الجمعية الموحدة التي تفتح لكم ذراعيها في المغرب.',
            nl: 'Duik in het hart van onze gemeenschap van alumni en weldoeners. CLB-KLB, de vereniging die u de armen opent in Marokko.',
        },
        cta: { fr: 'EN SAVOIR PLUS', ar: 'اعرف المزيد', nl: 'MEER WETEN' },
        ctaHref: '/a-propos',
    },
    {
        title: {
            fr: 'Deuxième slide',
            ar: 'الشريحة الثانية',
            nl: 'Tweede slide',
        },
        body: {
            fr: 'Contenu de la deuxième slide — à personnaliser selon vos besoins.',
            ar: 'محتوى الشريحة الثانية — يمكن تخصيصه حسب احتياجاتكم.',
            nl: 'Inhoud van de tweede slide — aan te passen naar wens.',
        },
        cta: { fr: 'EN SAVOIR PLUS', ar: 'اعرف المزيد', nl: 'MEER WETEN' },
        ctaHref: '#',
    },
];

const videoTitle = {
    fr: 'Présentation Officielle du Cercle des Lauréats de Belgique (CLB-KLB)',
    ar: 'العرض الرسمي لدائرة خريجي بلجيكا (CLB-KLB)',
    nl: 'Officiële presentatie van de Kring van Belgische Laureaten (CLB-KLB)',
};
const videoPlaceholderUrl =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';
const videoUrl =
    'https://www.youtube.com/embed/fdojEYgJuyE?si=JIhYM8UjExGMiRgz';

export default function NetworkVideoSection() {
    const { props } = usePage();
    const locale =
        props.locale && LOCALES.includes(props.locale) ? props.locale : DEFAULT;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slide = slides[currentSlide];
    const totalSlides = slides.length;
    const slideTitle = pick(slide.title, locale);
    const slideBody = pick(slide.body, locale);
    const slideCta = pick(slide.cta, locale);
    const videoTitleText = pick(videoTitle, locale);

    return (
        <section className="relative overflow-hidden bg-cl-black py-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,17,35,0.12),transparent)]" />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
                <div className="flex flex-col justify-center">
                    <p className="text-xs font-medium tracking-wider text-alpha uppercase">
                        <TransText
                            fr="À propos de nous"
                            ar="عنا"
                            nl="Over ons"
                        />
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-cl-white lg:text-4xl">
                        {slideTitle}
                    </h2>
                    <p className="mt-4 text-muted">{slideBody}</p>

                    <div className="mt-8 grid grid-cols-2 items-center gap-8">
                        <Link
                            href={slide.ctaHref}
                            className="flex-1 rounded-full bg-alpha px-12 py-4 text-center text-sm font-semibold text-cl-white transition hover:bg-alpha/85"
                        >
                            {slideCta}
                        </Link>

                        <div className="flex flex-1 items-center gap-4">
                            <div className="flex size-10 items-center justify-center rounded-full bg-alpha/20">
                                <svg
                                    viewBox="0 0 11 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 fill-alpha"
                                >
                                    <path d="M9.8875 10.5C8.67222 10.5 7.47153 10.2351 6.28542 9.70521C5.09931 9.17535 4.02014 8.4243 3.04792 7.45208C2.07569 6.47986 1.32465 5.40069 0.794792 4.21458C0.264931 3.02847 0 1.82778 0 0.6125C0 0.4375 0.0583333 0.291667 0.175 0.175C0.291667 0.0583333 0.4375 0 0.6125 0H2.975C3.11111 0 3.23264 0.0461806 3.33958 0.138542C3.44653 0.230903 3.50972 0.340278 3.52917 0.466667L3.90833 2.50833C3.92778 2.66389 3.92292 2.79514 3.89375 2.90208C3.86458 3.00903 3.81111 3.10139 3.73333 3.17917L2.31875 4.60833C2.51319 4.96806 2.7441 5.31562 3.01146 5.65104C3.27882 5.98646 3.57292 6.30972 3.89375 6.62083C4.19514 6.92222 4.51111 7.20174 4.84167 7.45937C5.17222 7.71701 5.52222 7.95278 5.89167 8.16667L7.2625 6.79583C7.35 6.70833 7.46424 6.64271 7.60521 6.59896C7.74618 6.55521 7.88472 6.54306 8.02083 6.5625L10.0333 6.97083C10.1694 7.00972 10.2812 7.08021 10.3687 7.18229C10.4562 7.28437 10.5 7.39861 10.5 7.525V9.8875C10.5 10.0625 10.4417 10.2083 10.325 10.325C10.2083 10.4417 10.0625 10.5 9.8875 10.5ZM1.76458 3.5L2.72708 2.5375L2.47917 1.16667H1.18125C1.22986 1.56528 1.29792 1.95903 1.38542 2.34792C1.47292 2.73681 1.59931 3.12083 1.76458 3.5ZM6.98542 8.72083C7.36458 8.88611 7.75104 9.01736 8.14479 9.11458C8.53854 9.21181 8.93472 9.275 9.33333 9.30417V8.02083L7.9625 7.74375L6.98542 8.72083Z" />
                                </svg>
                            </div>

                            <p className="font- text-lg text-white">
                                +212 6 66 17 47 12
                            </p>
                        </div>
                    </div>
                    {/* <div className="mt-8 flex items-center gap-2 text-sm text-cl-white/70">
                        <button
                            type="button"
                            onClick={() =>
                                setCurrentSlide((s) =>
                                    s === 0 ? totalSlides - 1 : s - 1,
                                )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-cl-white/30 text-cl-white transition hover:border-alpha hover:bg-alpha/20"
                            aria-label={
                                locale === 'fr'
                                    ? 'Slide précédent'
                                    : locale === 'ar'
                                      ? 'الشريحة السابقة'
                                      : 'Vorige slide'
                            }
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="min-w-[4rem] text-center text-sm font-medium text-cl-white/80">
                            {currentSlide + 1} / {totalSlides}
                        </span>
                        <button
                            type="button"
                            onClick={() =>
                                setCurrentSlide((s) =>
                                    s === totalSlides - 1 ? 0 : s + 1,
                                )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-cl-white/30 text-cl-white transition hover:border-alpha hover:bg-alpha/20"
                            aria-label={
                                locale === 'fr'
                                    ? 'Slide suivant'
                                    : locale === 'ar'
                                      ? 'الشريحة التالية'
                                      : 'Volgende slide'
                            }
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div> */}
                </div>
                <iframe
                    className="aspect-video w-full"
                    src="https://www.youtube.com/embed/fdojEYgJuyE?si=JIhYM8UjExGMiRgz"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
                {/* <div className="relative aspect- overflow-  rounded-xl bg-cl-black">
                    <a
                        href={videoUrl || '#'}
                        target={videoUrl ? '_blank' : undefined}
                        rel={videoUrl ? 'noopener noreferrer' : undefined}
                        className="absolute inset-0 flex items-center justify-center bg-cl-black"
                    >
                        <img
                            src={videoPlaceholderUrl}
                            alt=""
                            className="absolute inset-0 object-cover opacity-80"
                        />
                        <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-alpha/90 text-cl-white transition hover:bg-alpha">
                            <svg
                                className="ml-1 h-8 w-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </a>
                    <p className="absolute right-0 bottom-0 left-0 bg-cl-black/80 p-4 text-sm text-cl-white">
                        {videoTitleText}
                    </p>
                </div> */}
            </div>
        </section>
    );
}
