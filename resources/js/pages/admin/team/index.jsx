import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
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

    console.log(teamMembers);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team members" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold italic text-foreground lg:text-3xl">Team members</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage the people shown in the “Notre Équipe” section.</p>
                    </div>
                    <Button asChild className="shrink-0 rounded-lg bg-alpha text-white shadow-md hover:bg-alpha/90">
                        <Link href="/admin/team/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add member
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="border-b border-border bg-muted/30 px-4 py-3 sm:px-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {teamMembers.length} {teamMembers.length === 1 ? 'member' : 'members'}
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        {teamMembers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                                <Users className="mx-auto mb-3 h-12 w-12 text-muted-foreground/60" />
                                <p className="font-medium text-foreground">No team members yet</p>
                                <p className="mt-1 text-sm text-muted-foreground">Add your first team member to display them on the home and about pages.</p>
                                <Button asChild className="mt-4 rounded-lg bg-alpha text-white hover:bg-alpha/90">
                                    <Link href="/admin/team/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add member
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-border bg-muted/20 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-4 sm:px-6">Photo</th>
                                        <th className="px-4 py-4 sm:px-6">Name</th>
                                        <th className="hidden px-4 py-4 sm:px-6 md:table-cell">Position</th>
                                        <th className="hidden px-4 py-4 sm:px-6 md:table-cell">Order</th>
                                        <th className="px-4 py-4 text-right sm:px-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {teamMembers.map((member) => (
                                        <tr key={member.id} className="transition-colors hover:bg-muted/20">
                                            <td className="px-4 py-3 sm:px-6">
                                                <div className="h-12 w-12 overflow-hidden rounded-xl border border-border bg-muted">
                                                    <img src={member.image_url ?? member.image_path} alt="" className="h-full w-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-foreground sm:px-6">{member.name}</td>
                                            <td className="hidden px-4 py-3 text-muted-foreground md:table-cell sm:px-6">{member.position || '—'}</td>
                                            <td className="hidden px-4 py-3 text-muted-foreground md:table-cell sm:px-6">{member.sort_order}</td>
                                            <td className="px-4 py-3 sm:px-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="outline" size="sm" className="rounded-lg" asChild>
                                                        <Link href={`/admin/team/${member.id}/edit`}>
                                                            <Edit className="mr-1.5 h-3.5 w-3.5" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" className="rounded-lg" onClick={() => setDeleteId(member.id)}>
                                                        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmDeleteDialog
                open={deleteId !== null}
                onOpenChange={(val) => { if (!val) setDeleteId(null); }}
                onConfirm={handleDelete}
                processing={deleting}
                title="Delete team member"
                description="This member will be removed from the team section. This action cannot be undone."
            />
            <AlertSuccess message={flash?.success} />
        </AppLayout>
    );
}
