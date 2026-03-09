import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import BlogsTable from './partials/BlogsTable';
import CreateBlogModal from './partials/CreateBlogModal';
import EditBlogModal from './partials/EditBlogModal';
import { useState } from 'react';

export default function AdminBlogIndex({ blogs = [], activeLocale = 'fr' }) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    return (
        <>
            <AppLayout>
                <Head title="Articles du blog" />
                <div className="w-full pt-6 pr-6 pb-6 pl-6">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Articles du blog
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Gérez les articles et le contenu du blog.
                            </p>
                        </div>
                        <Button
                            onClick={() => setCreateOpen(true)}
                            className="w-fit shrink-0"
                        >
                            Nouvel article
                        </Button>
                    </div>

                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base">
                                Liste des articles
                            </CardTitle>
                            <CardDescription>
                                {blogs.length === 0
                                    ? 'Aucun article pour le moment.'
                                    : `${blogs.length} article${blogs.length > 1 ? 's' : ''}`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <BlogsTable
                                blogs={blogs}
                                activeLocale={activeLocale}
                                onEdit={setEditingBlog}
                                onDeleteSuccess={() => {}}
                            />
                        </CardContent>
                    </Card>
                </div>

                <CreateBlogModal
                    open={createOpen}
                    onOpenChange={setCreateOpen}
                />
                <EditBlogModal
                    blog={editingBlog}
                    open={!!editingBlog}
                    onOpenChange={(open) => !open && setEditingBlog(null)}
                />
            </AppLayout>
        </>
    );
}
