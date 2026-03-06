import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PageHero from '@/components/PageHero';
import TransText from '@/components/TransText';
import CategoryFilters from './Partials/CategoryFilters';
import BlogCard from './Partials/BlogCard';
import Pagination from './Partials/Pagination';

export default function BlogIndex() {
    const { blogs = [], categories = [], currentCategory = 'tout', pagination } = usePage().props;

    return (
        <>
            <Head title="Blog - Cercle des Lauréats de Belgique" />
            <PageHero
                subtitle={<TransText fr="Actualité" ar="الأخبار" nl="Nieuws" />}
                title={
                    <TransText
                        fr="Bienvenue sur le blog du Cercle des Lauréats de Belgique"
                        ar="مرحباً بكم في مدونة دائرة خريجي بلجيكا"
                        nl="Welkom op de blog van de Cercle des Lauréats de Belgique"
                    />
                }
            />
            <TransText
                as="p"
                className="mx-auto max-w-3xl px-4 pt-8 pb-6 text-center text-base text-muted-foreground sm:text-lg"
                fr="Ici, nous explorons les réussites exceptionnelles qui font la fierté de notre nation. Que vous soyez membre du CLB, aspirant lauréat ou simplement curieux, ce blog est votre passeport pour découvrir les histoires inspirantes et les réalisations extraordinaires qui façonnent l'excellence belge au Maroc."
                ar="هنا نستكشف النجاحات الاستثنائية التي تشكل فخر أمتنا. سواء كنت عضواً في CLB أو طالباً للتميز أو ببساطة فضولياً، هذا المدونة هو جواز سفرك لاكتشاف القصص الملهمة والإنجازات الاستثنائية التي تشكل التميز البلجيكي في المغرب."
                nl="Hier verkennen we de uitzonderlijke successen die de trots van onze natie vormen. Of u nu lid bent van de CLB, aspirant-laureaat of gewoon nieuwsgierig, deze blog is uw paspoort om de inspirerende verhalen en buitengewone prestaties te ontdekken die het Belgische excellentie in Marokko vormgeven."
            />
            <CategoryFilters categories={categories} currentCategory={currentCategory} />
            <div className="mx-auto max-w-6xl px-4 pb-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
                <Pagination pagination={pagination} />
            </div>
        </>
    );
}

BlogIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
