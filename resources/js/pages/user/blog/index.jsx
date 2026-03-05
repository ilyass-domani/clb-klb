import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import PageHero from '@/components/PageHero';
import TransText from '@/components/TransText';
import CategoryFilters from './Partials/CategoryFilters';
import BlogCard from './Partials/BlogCard';
import Pagination from './Partials/Pagination';

export default function BlogIndex() {
    const { posts = [], categories = [], currentCategory = 'tout', pagination } = usePage().props;

    return (
        <>
            <Head title="Blog - Cercle des Lauréats de Belgique" />
            <PageHero
                subtitle={<TransText fr="Actualité" ar="الأخبار" nl="Nieuws" />}
                title="Bienvenue sur le blog du Cercle des Lauréats de Belgique"
            />
            <p className="mx-auto max-w-3xl px-4 pt-8 pb-6 text-center text-base text-muted-foreground sm:text-lg">
                Ici, nous explorons les réussites exceptionnelles qui font la fierté de notre nation.
                Que vous soyez membre du CLB, aspirant lauréat ou simplement curieux, ce blog est
                votre passeport pour découvrir les histoires inspirantes et les réalisations
                extraordinaires qui façonnent l'excellence belge au Maroc.
            </p>
            <CategoryFilters categories={categories} currentCategory={currentCategory} />
            <div className="mx-auto max-w-6xl px-4 pb-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
                <Pagination pagination={pagination} />
            </div>
        </>
    );
}

BlogIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
