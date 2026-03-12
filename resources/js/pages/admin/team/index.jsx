import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2, UserCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/Table';
import ConfirmDeleteDialog from '@/components/confirm-delete-dialog';
import AlertSuccess from '@/components/alert-success';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Team', href: '/admin/team' },
];

export default function AdminTeamIndex({ teamMembers }) {
    const { flash } = usePage().props;
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);
        router.delete(`/admin/team/${deleteId}`, {
            onFinish: () => {
                setDeleting(false);
                setDeleteId(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team members" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground italic lg:text-3xl">
                            {teamMembers.length}{' '}
                            {teamMembers.length <= 1
                                ? 'Team member'
                                : 'Team members'}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage the people shown in the “Notre Équipe”
                            section.
                        </p>
                    </div>
                    <Button
                        asChild
                        className="shrink-0 rounded-lg bg-alpha text-white shadow-md hover:bg-alpha/90"
                    >
                        <Link href="/admin/team/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New member
                        </Link>
                    </Button>
                </div>

                <Table
                    data={teamMembers}
                    rowClassName="hover:bg-muted/20"
                    columns={[
                        {
                            header: 'Photo',
                            headerClassName: 'px-4 py-4 sm:px-6',
                            cellClassName: 'px-4 py-3 sm:px-6',
                            render: (m) => (
                                <div className="h-12 w-12 overflow-hidden rounded-xl border border-border bg-muted">
                                    <img
                                        src={m.image_url ?? m.image_path}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ),
                        },
                        {
                            header: 'Name',
                            headerClassName: 'px-4 py-4 sm:px-6',
                            cellClassName:
                                'px-4 py-3 font-medium text-foreground sm:px-6',
                            render: (m) => m.name,
                        },
                        {
                            header: 'Position',
                            headerClassName:
                                'hidden px-4 py-4 sm:px-6 md:table-cell',
                            cellClassName:
                                'hidden px-4 py-3 sm:px-6 md:table-cell',
                            render: (m) => m.position || '—',
                        },
                        {
                            header: 'Category',
                            headerClassName:
                                'hidden px-4 py-4 sm:px-6 md:table-cell',
                            cellClassName:
                                'hidden px-4 py-3 sm:px-6 md:table-cell',
                            render: (m) => (
                                <span className="inline-block rounded-full bg-alpha/10 px-2.5 py-0.5 text-xs font-medium text-alpha">
                                    {m.category === 'honorary'
                                        ? 'Honorary'
                                        : 'Bureau'}
                                </span>
                            ),
                        },
                        {
                            header: 'Order',
                            headerClassName:
                                'hidden px-4 py-4 sm:px-6 md:table-cell',
                            cellClassName:
                                'hidden px-4 py-3 sm:px-6 md:table-cell',
                            render: (m) => m.sort_order,
                        },
                        {
                            header: 'Actions',
                            headerClassName: 'px-4 py-4 text-right sm:px-6',
                            cellClassName: 'px-4 py-3 sm:px-6',
                            render: (m) => (
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-lg"
                                        asChild
                                    >
                                        <Link href={`/admin/team/${m.id}/edit`}>
                                            <Edit className="mr-1.5 h-3.5 w-3.5" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="rounded-lg"
                                        onClick={() => setDeleteId(m.id)}
                                    >
                                        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                                        Delete
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    emptyState={
                        <>
                            <UserCircle className="mx-auto mb-3 size-10 text-muted-foreground" />
                            <p className="font-medium text-foreground">
                                No team members yet
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Add your first team member to display them on
                                the home and about pages.
                            </p>
                        </>
                    }
                />
            </div>

            <ConfirmDeleteDialog
                open={deleteId !== null}
                onOpenChange={(val) => {
                    if (!val) setDeleteId(null);
                }}
                onConfirm={handleDelete}
                processing={deleting}
                title="Delete team member"
                description="This member will be removed from the team section. This action cannot be undone."
            />
            <AlertSuccess message={flash?.success} />
        </AppLayout>
    );
}
