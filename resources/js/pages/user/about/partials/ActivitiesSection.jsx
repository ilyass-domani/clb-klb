import { Link } from '@inertiajs/react';
import { TransText } from '@/components';
import { GOOGLE_FORM_URL } from '@/lib/consts';

export function ActivitiesSection() {
    return (
        <section className="border-b border-border bg-foreground py-20 lg:py-28">
            <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <TransText
                        fr="Nos activités"
                        ar="أنشطتنا"
                        nl="Onze activiteiten"
                        as="p"
                        className="text-sm font-medium tracking-wider text-alpha uppercase"
                    />
                    <TransText
                        fr="Activités et Actions"
                        ar="الأنشطة والإجراءات"
                        nl="Activiteiten en acties"
                        as="h2"
                        className="mt-2 text-3xl font-bold text-cl-white lg:text-4xl"
                    />
                    <TransText
                        fr="Plongez au cœur de notre communauté. Découvrez comment nous transformons les idées en réalisations. Rejoignez-nous et devenez un acteur du changement positif."
                        ar="انغمسوا في قلب مجتمعنا. اكتشفوا كيف نحول الأفكار إلى إنجازات. انضموا إلينا وكونوا فاعلين في التغيير الإيجابي."
                        nl="Duik in het hart van onze gemeenschap. Ontdek hoe we ideeën in realisaties omzetten. Sluit je bij ons aan en word een actor van positieve verandering."
                        as="p"
                        className="mt-6 leading-relaxed text-cl-white/90"
                    />
                    <a
                        href={GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 w-fit rounded-full bg-alpha px-12 py-4 text-sm font-semibold text-cl-white transition hover:bg-alpha/85"
                    >
                        <TransText
                            fr="Devenez membre"
                            ar="انضم كعضو"
                            nl="Word lid"
                        />
                    </a>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-2xl">
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

export default ActivitiesSection;
