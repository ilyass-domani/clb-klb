import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

const activitiesText = {
    fr: 'Plongez au cœur de notre communauté. Découvrez comment nous transformons les idées en réalisations. Rejoignez-nous et devenez un acteur du changement positif.',
    ar: 'انغمسوا في قلب مجتمعنا. اكتشفوا كيف نحول الأفكار إلى إنجازات. انضموا إلينا وكونوا فاعلين في التغيير الإيجابي.',
    nl: 'Duik in het hart van onze gemeenschap. Ontdek hoe we ideeën in realisaties omzetten. Sluit je bij ons aan en word een actor van positieve verandering.',
};

export default function ActivitiesSection() {
    return (
        <section className="border-b border-border bg-foreground py-20 lg:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-6">
                <div className="flex flex-col justify-center">
                    <p className="text-sm font-medium tracking-wider text-alpha uppercase">
                        <TransText
                            fr="Nos activités"
                            ar="أنشطتنا"
                            nl="Onze activiteiten"
                            as="span"
                        />
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-cl-white lg:text-4xl">
                        <TransText
                            fr="Activités et Actions"
                            ar="الأنشطة والإجراءات"
                            nl="Activiteiten en acties"
                            as="span"
                        />
                    </h2>
                    <p className="mt-6 leading-relaxed text-cl-white/90">
                        <TransText
                            fr={activitiesText.fr}
                            ar={activitiesText.ar}
                            nl={activitiesText.nl}
                            as="span"
                        />
                    </p>
                    <Link
                        href="#"
                        className="mt-8 inline-block w-fit rounded-lg bg-alpha px-6 py-3 text-sm font-medium text-cl-white uppercase transition hover:opacity-95"
                    >
                        <TransText
                            fr="EN SAVOIR PLUS"
                            ar="اعرف المزيد"
                            nl="MEER WETEN"
                            as="span"
                        />
                    </Link>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <img
                        src="/assets/about-team.png"
                        alt="Équipe CLB KLB"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
        </section>
    );
}
