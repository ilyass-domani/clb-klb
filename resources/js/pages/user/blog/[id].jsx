import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import BlogDetail from './partials/BlogDetail';

/**
 * Single blog post detail page. Uses AppLayout; content delegated to BlogDetail.
 */
export default function BlogPostShow({ blog }) {
    if (!blog) {
        return null;
    }

    return (
        <>
            <Head title={`${blog.title} - Blog CLB`} />
            <BlogDetail blog={blog} />
        </>
    );
}

BlogPostShow.layout = (page) => <AppLayout>{page}</AppLayout>;
