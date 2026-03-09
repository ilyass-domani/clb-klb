import { TransText } from '@/components';

export default function WhoWeAreSection() {
    return (
        <section className="border-b border-border bg-background py-20 lg:py-28">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted shadow-(--shadow-card)">
                    <img
                        src="/assets/about-team.png"
                        alt="Équipe CLB KLB"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <TransText
                        fr="About us"
                        ar="عنا"
                        nl="Over ons"
                        as="p"
                        className="text-sm font-medium tracking-wider text-alpha uppercase"
                    />
                    <TransText
                        fr="Qui sommes nous"
                        ar="من نحن"
                        nl="Wie zijn we"
                        as="h2"
                        className="mt-2 text-3xl font-bold text-foreground lg:text-4xl"
                    />
                    <TransText
                        fr="Le Club des Diplômés du Maroc est l'approche au Maroc pour les femmes dirigeantes et entrepreneurs. Le CLB-KLP est la première association 100% féminine dans le paysage des associations au Maroc, dédiée au développement et au leadership féminin. Le CLB-KLP s'engage pour donner aux femmes dirigeantes une opportunité de partage, d'échange et une plateforme d'entraide."
                        ar="نادي خريجي المغرب هو المرجع في المغرب للنساء القياديات ورائدات الأعمال. CLB-KLP هي أول جمعية نسائية 100٪ في مشهد الجمعيات بالمغرب، مكرسة للتنمية والقيادة النسائية. تلتزم CLB-KLP بمنح القياديات فرصة للمشاركة والتبادل ومنصة للتعاون المتبادل."
                        nl="De Club van Marokkaanse Afgestudeerden is de referentie in Marokko voor vrouwelijke leiders en onderneemsters. CLB-KLP is de eerste 100% vrouwelijke vereniging in het Marokkaanse verenigingslandschap, gewijd aan ontwikkeling en vrouwelijk leiderschap. CLB-KLP zet zich in om vrouwelijke leiders kansen te bieden voor uitwisseling en een platform voor onderlinge steun."
                        as="p"
                        className="mt-6 leading-relaxed text-foreground/90"
                    />
                </div>
            </div>
        </section>
    );
}
