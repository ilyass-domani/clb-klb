import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import BlogsTable from './Partials/BlogsTable';
import CreateBlogModal from './Partials/CreateBlogModal';
import EditBlogModal from './Partials/EditBlogModal';
import { useState } from 'react';

export default function Index({ blogs = [], activeLocale = 'fr' }) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    return (
        <>
            <Head title="Blogs" />
            <div className="mx-auto max-w-6xl space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Blogs</h1>
                    <Button onClick={() => setCreateOpen(true)}>Create Blog</Button>
                </div>
                <BlogsTable
                    blogs={blogs}
                    activeLocale={activeLocale}
                    onEdit={setEditingBlog}
                    onDeleteSuccess={() => {}}
                />
            </div>

            <CreateBlogModal open={createOpen} onOpenChange={setCreateOpen} />
            <EditBlogModal
                blog={editingBlog}
                open={!!editingBlog}
                onOpenChange={(open) => !open && setEditingBlog(null)}
            />
        </>
    );
}

Index.layout = (page) => <AppLayout>{page}</AppLayout>;
