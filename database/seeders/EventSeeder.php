<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $events = [
            [
                'title'       => json_encode(['fr' => "F'tor-Débat : Leadership Féminin, Réalités Et Défis", 'ar' => "إفطار-نقاش: القيادة النسائية، الواقع والتحديات", 'nl' => "F'tor-Debat: Vrouwelijk Leiderschap, Realiteiten en Uitdagingen"]),
                'description' => json_encode([
                    'fr' => "Rencontre exceptionnelle avec Dr Younes Sakkouri, Ministre de l'Inclusion économique, de la Petite entreprise, de l'Emploi et des Compétences. Un dialogue ouvert sur les réalités du leadership féminin au Maroc et en Belgique, les défis structurels et les leviers pour favoriser l'égalité des chances. Échanges avec des lauréates et des acteurs du monde économique. Inscription obligatoire, places limitées.",
                    'ar' => "لقاء استثنائي مع الدكتور يونس السكوري، وزير الإدماج الاقتصادي والمؤسسات الصغرى والتشغيل والكفاءات. حوار مفتوح حول واقع القيادة النسائية في المغرب وبلجيكا، والتحديات الهيكلية والآليات لتعزيز تكافؤ الفرص. تبادل مع خريجات وفاعلين من العالم الاقتصادي. التسجيل إلزامي، أماكن محدودة.",
                    'nl' => "Uitzonderlijke ontmoeting met Dr. Younes Sakkouri, Minister van Economische Inclusie, Kleine Ondernemingen, Werkgelegenheid en Vaardigheden. Een open dialoog over de realiteit van vrouwelijk leiderschap in Marokko en België, structurele uitdagingen en hefbomen voor gelijke kansen. Uitwisseling met laureaten en actoren uit de economische wereld. Verplichte inschrijving, beperkt aantal plaatsen.",
                ]),
                'date'        => '2026-03-06',
                'time'        => '17:30:00',
                'category'   => json_encode(['fr' => 'Conférence', 'ar' => 'مؤتمر', 'nl' => 'Conferentie']),
                'price'       => 300,
                'image'       => 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80',
                'location'    => 'Cinéma Renaissance, Rabat',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => json_encode(['fr' => 'Gala Annuel des Lauréats de Belgique', 'ar' => 'الحفل السنوي لخريجي بلجيكا', 'nl' => 'Jaarlijks Gala van Belgische Laureaten']),
                'description' => json_encode([
                    'fr' => "Célébrez l'excellence et l'amitié maroco-belge lors de notre prestigieux gala annuel. Dîner de gala, remise des prix aux lauréats distingués, interventions de personnalités belges et marocaines, et soirée networking dans un cadre d'exception. Tenue de soirée requise. L'événement phare du Cercle qui réunit chaque année membres, partenaires et invités d'honneur.",
                    'ar' => "احتفلوا بالتميز والصداقة المغربية البلجيكية خلال حفلنا السنوي المرموق. عشاء غالا، تسليم الجوائز للخريجين المميزين، كلمات لشخصيات بلجيكية ومغربية، وأمسية تواصل في إطار استثنائي. اللباس الرسمي مطلوب. الحدث الأبرز للدائرة الذي يجمع سنوياً الأعضاء والشركاء والضيوف الشرفيين.",
                    'nl' => "Vier de uitmuntendheid en de Marokkaans-Belgische vriendschap tijdens ons prestigieus jaarlijks gala. Galadiner, uitreiking van prijzen aan onderscheiden laureaten, toespraken van Belgische en Marokkaanse persoonlijkheden, en netwerksoiree in een uitzonderlijk kader. Avondkledij vereist. Het vlaggenschipevenement van de Kring dat jaarlijks leden, partners en eregasten samenbrengt.",
                ]),
                'date'        => '2026-04-15',
                'time'        => '19:00:00',
                'category'   => json_encode(['fr' => 'Gala', 'ar' => 'حفل', 'nl' => 'Gala']),
                'price'       => 0,
                'image'       => 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
                'location'    => 'Hôtel Sofitel, Casablanca',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => json_encode(['fr' => 'Afterwork B2B : Synergies Économiques', 'ar' => 'لقاء مهني: التآزر الاقتصادي', 'nl' => 'Afterwork B2B: Economische Synergieën']),
                'description' => json_encode([
                    'fr' => "Une soirée de réseautage dédiée aux entrepreneurs et cadres dirigeants pour créer de nouvelles opportunités entre le Maroc et la Belgique. Présentations courtes de secteurs porteurs, sessions de speed networking, et échanges informels autour d'un cocktail. Idéal pour développer sa visibilité et ses partenariats dans un cadre convivial. Inscription recommandée.",
                    'ar' => "أمسية تواصل مخصصة لرواد الأعمال والمديرين التنفيذيين لخلق فرص جديدة بين المغرب وبلجيكا. عروض قصيرة لقطاعات واعدة، جلسات تواصل سريع، وتبادل غير رسمي خلال كوكتيل. مثالي لتطوير الحضور والشراكات في إطار ودود. التسجيل موصى به.",
                    'nl' => "Een netwerkevenement gewijd aan ondernemers en leidinggevenden om nieuwe kansen te creëren tussen Marokko en België. Korte presentaties van veelbelovende sectoren, speednetworking-sessies en informele uitwisseling tijdens een cocktail. Ideaal om uw zichtbaarheid en partnerschappen te ontwikkelen in een gezellige sfeer. Inschrijving aanbevolen.",
                ]),
                'date'        => '2026-05-28',
                'time'        => '18:30:00',
                'category'   => json_encode(['fr' => 'Networking', 'ar' => 'تواصل', 'nl' => 'Networking']),
                'price'       => 0,
                'image'       => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
                'location'    => 'The View Hotel, Rabat',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => json_encode(['fr' => 'Forum Innovation & Startups', 'ar' => 'منتدى الابتكار والشركات الناشئة', 'nl' => 'Innovatie & Startups Forum']),
                'description' => json_encode([
                    'fr' => "Une journée dédiée à l'innovation et aux startups marocaines et internationales, avec un focus sur les liens Belgique–Maroc. Pitch sessions, tables rondes avec investisseurs et accélérateurs, stands et démonstrations. L'occasion de découvrir les projets lauréats et de tisser des liens avec l'écosystème startup. Programme détaillé et billetterie en ligne.",
                    'ar' => "يوم مخصص للابتكار والشركات الناشئة المغربية والدولية، مع تركيز على الروابط بلجيكا–المغرب. جلسات عرض، طاولات مستديرة مع مستثمرين ومسرعات، أجنحة وعروض. فرصة لاكتشاف المشاريع الفائزة وبناء روابط مع منظومة الشركات الناشئة. برنامج مفصل وتذاكر عبر الإنترنت.",
                    'nl' => "Een dag gewijd aan innovatie en startups uit Marokko en internationaal, met focus op België–Marokko. Pitchsessies, rondetafels met investeerders en versnellers, stands en demonstraties. De gelegenheid om winnende projecten te ontdekken en banden aan te knopen met het start-up-ecosysteem. Gedetailleerd programma en online ticketing.",
                ]),
                'date'        => '2026-06-10',
                'time'        => '10:00:00',
                'category'   => json_encode(['fr' => 'Forum', 'ar' => 'منتدى', 'nl' => 'Forum']),
                'price'       => 150,
                'image'       => 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80',
                'location'    => 'Technopark, Casablanca',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => json_encode(['fr' => 'Workshop : Leadership des Jeunes', 'ar' => 'ورشة: قيادة الشباب', 'nl' => 'Workshop: Jongerenleiderschap']),
                'description' => json_encode([
                    'fr' => "Atelier interactif pour développer les compétences de leadership chez les jeunes professionnels issus des formations belges au Maroc. Exercices en groupe, retours d'expérience de leaders du Cercle, et mise en situation. Nombre de places limité pour favoriser les échanges. Matériel fourni. Certificat de participation remis en fin de session.",
                    'ar' => "ورشة تفاعلية لتطوير مهارات القيادة لدى الشباب من خريجي التكوينات البلجيكية في المغرب. تمارين جماعية، شهادات قادة الدائرة، وتمارين تطبيقية. عدد محدود من الأماكن لتعزيز التبادل. أدوات مقدمة. شهادة مشاركة في نهاية الجلسة.",
                    'nl' => "Interactieve workshop om leiderschapsvaardigheden te ontwikkelen bij jonge professionals van Belgische opleidingen in Marokko. Groepsoefeningen, ervaringsverhalen van leiders van de Kring en rollenspellen. Beperkt aantal plaatsen om uitwisseling te bevorderen. Materiaal verstrekt. Deelnamecertificaat aan het einde van de sessie.",
                ]),
                'date'        => '2026-06-25',
                'time'        => '14:00:00',
                'category'   => json_encode(['fr' => 'Workshop', 'ar' => 'ورشة', 'nl' => 'Workshop']),
                'price'       => 100,
                'image'       => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
                'location'    => 'ESCA Business School, Casablanca',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => json_encode(['fr' => 'Conférence : Diplomatie Économique', 'ar' => 'مؤتمر: الدبلوماسية الاقتصادية', 'nl' => 'Conferentie: Economische Diplomatie']),
                'description' => json_encode([
                    'fr' => "Discussion autour du rôle de la diplomatie dans le développement économique et les échanges commerciaux entre la Belgique et le Maroc. Invités : ambassadeurs, conseillers économiques et chefs d'entreprise. Suivi d'un débat avec le public et d'un cocktail. Entrée libre sur inscription. En partenariat avec des acteurs institutionnels belges et marocains.",
                    'ar' => "نقاش حول دور الدبلوماسية في التنمية الاقتصادية والتبادل التجاري بين بلجيكا والمغرب. ضيوف: سفراء ومستشارون اقتصاديون ورؤساء شركات. يليه نقاش مع الجمهور وكوكتيل. دخول حر بالتسجيل. بالشراكة مع فاعلين مؤسساتيين بلجيكيين ومغاربة.",
                    'nl' => "Discussie over de rol van diplomatie in economische ontwikkeling en handelsuitwisseling tussen België en Marokko. Gasten: ambassadeurs, economische adviseurs en bedrijfsleiders. Gevolgd door een debat met het publiek en een cocktail. Gratis toegang na inschrijving. In partnerschap met Belgische en Marokkaanse institutionele actoren.",
                ]),
                'date'        => '2026-07-12',
                'time'        => '16:00:00',
                'category'   => json_encode(['fr' => 'Conférence', 'ar' => 'مؤتمر', 'nl' => 'Conferentie']),
                'price'       => 0,
                'image'       => 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
                'location'    => 'Université Mohammed V, Rabat',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => json_encode(['fr' => 'Dîner de Networking International', 'ar' => 'عشاء تواصل دولي', 'nl' => 'Internationaal Netwerkdiner']),
                'description' => json_encode([
                    'fr' => "Rencontrez des leaders internationaux et développez votre réseau professionnel dans un cadre privilégié. Dîner assis, interventions courtes de personnalités du monde des affaires et de la diplomatie, puis temps d'échange libre. Idéal pour les membres du Cercle et leurs invités souhaitant élargir leurs contacts Belgique–Maroc. Tenue correcte exigée.",
                    'ar' => "تعرفوا على قادة دوليين وطوروا شبكتكم المهنية في إطار متميز. عشاء جلوس، كلمات قصيرة لشخصيات من عالم الأعمال والدبلوماسية، ثم وقت تبادل حر. مثالي لأعضاء الدائرة وضيوفهم الراغبين في توسيع شبكة اتصالاتهم بلجيكا–المغرب. اللباس اللائق مطلوب.",
                    'nl' => "Ontmoet internationale leiders en ontwikkel uw professioneel netwerk in een bevoorrechte setting. Zittend diner, korte toespraken van persoonlijkheden uit het zakenleven en de diplomatie, gevolgd door vrije uitwisseling. Ideaal voor leden van de Kring en hun gasten die hun België–Marokko-contacten willen uitbreiden. Correcte kledij vereist.",
                ]),
                'date'        => '2026-08-05',
                'time'        => '20:00:00',
                'category'   => json_encode(['fr' => 'Networking', 'ar' => 'تواصل', 'nl' => 'Networking']),
                'price'       => 250,
                'image'       => 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
                'location'    => 'Hyatt Regency, Casablanca',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => json_encode(['fr' => 'Séminaire : Entrepreneuriat Féminin', 'ar' => 'ندوة: ريادة الأعمال النسائية', 'nl' => 'Seminar: Vrouwelijk Ondernemerschap']),
                'description' => json_encode([
                    'fr' => "Séminaire dédié à l'autonomisation économique des femmes entrepreneures, avec des témoignages, des ateliers pratiques et des rendez-vous B2B. En collaboration avec des organismes de soutien à l'entrepreneuriat féminin en Belgique et au Maroc. Programme sur une demi-journée avec pause déjeuner offerte. Inscription obligatoire, places limitées.",
                    'ar' => "ندوة مخصصة لتمكين رائدات الأعمال اقتصاديًا، مع شهادات وورش عملية ومواعيد B2B. بالتعاون مع هيئات دعم ريادة الأعمال النسائية في بلجيكا والمغرب. برنامج نصف يوم مع استراحة غداء مقدمة. التسجيل إلزامي، أماكن محدودة.",
                    'nl' => "Seminar gewijd aan economische empowerment van vrouwelijke ondernemers, met getuigenissen, praktische workshops en B2B-afspraken. In samenwerking met organisaties ter ondersteuning van vrouwelijk ondernemerschap in België en Marokko. Programma over een halve dag met aangeboden lunchpauze. Verplichte inschrijving, beperkt aantal plaatsen.",
                ]),
                'date'        => '2026-09-18',
                'time'        => '15:30:00',
                'category'   => json_encode(['fr' => 'Séminaire', 'ar' => 'ندوة', 'nl' => 'Seminar']),
                'price'       => 120,
                'image'       => 'https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80',
                'location'    => 'Palais des Congrès, Marrakech',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => json_encode(['fr' => 'Rencontre Culturelle Maroc-Belgique', 'ar' => 'لقاء ثقافي مغربي بلجيكي', 'nl' => 'Culturele Ontmoeting Marokko-België']),
                'description' => json_encode([
                    'fr' => "Une soirée culturelle célébrant l'amitié entre le Maroc et la Belgique : expositions, performances artistiques, dégustation de spécialités des deux pays. Ouvert aux membres et à leurs familles. L'occasion de partager des moments conviviaux et de renforcer les liens culturels au sein du Cercle. Entrée libre sur réservation. Enfants bienvenus à partir de 12 ans.",
                    'ar' => "أمسية ثقافية تحتفي بالصداقة بين المغرب وبلجيكا: معارض وعروض فنية وتذوق أطباق من البلدين. مفتوح للأعضاء وعائلاتهم. فرصة لمشاركة لحظات ودية وتعزيز الروابط الثقافية داخل الدائرة. دخول حر بالحجز. الأطفال مرحب بهم من 12 سنة.",
                    'nl' => "Een culturele avond ter viering van de vriendschap tussen Marokko en België: tentoonstellingen, artistieke optredens en proeverij van specialiteiten uit beide landen. Open voor leden en hun gezinnen. De gelegenheid om gezellige momenten te delen en de culturele banden binnen de Kring te versterken. Gratis toegang op reservering. Kinderen welkom vanaf 12 jaar.",
                ]),
                'date'        => '2026-10-10',
                'time'        => '18:00:00',
                'category'   => json_encode(['fr' => 'Culture', 'ar' => 'ثقافة', 'nl' => 'Cultuur']),
                'price'       => 0,
                'image'       => 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
                'location'    => 'Villa des Arts, Casablanca',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];

        DB::table('events')->insert($events);
    }
}
