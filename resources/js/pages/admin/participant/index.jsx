import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Mail, Phone, Trash2, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import ConfirmDeleteDialog from '@/components/confirm-delete-dialog';
import AlertSuccess from '@/components/alert-success';
import TransText from '@/components/TransText';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Participants', href: '/admin/participants' },
];

export default function AdminParticipantIndex({ participants, events, selectedEventId }) {
    const { flash } = usePage().props;
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);
        router.delete(`/admin/participants/${deleteId}`, {
            onFinish: () => {
                setDeleting(false);
                setDeleteId(null);
            },
        });
    };

    const handleFilterChange = (e) => {
        const eventId = e.target.value;
        if (eventId) {
            router.get('/admin/participants', { event_id: eventId }, { preserveState: true });
        } else {
            router.get('/admin/participants', {}, { preserveState: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Participants" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold italic text-foreground lg:text-3xl">Participants</h1>
                        <p className="mt-1 text-sm text-muted-foreground">View and manage event registrations</p>
                    </div>
                    <select
                        className="border-input bg-background focus-visible:ring-ring rounded-lg border px-4 py-2 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        value={selectedEventId || ''}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Events</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                <TransText {...event.title} />
                            </option>
                        ))}
                    </select>
                </div>

                {/* Participants Table */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="border-b bg-alpha/5 px-6 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-alpha">
                            {participants.length} {participants.length === 1 ? 'Participant' : 'Participants'}
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">First Name</th>
                                    <th className="px-6 py-4 font-semibold">Last Name</th>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold">Phone</th>
                                    <th className="px-6 py-4 font-semibold">Event</th>
                                    <th className="px-6 py-4 font-semibold">Registered At</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {participants.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center">
                                            <Users className="mx-auto mb-3 h-10 w-10 text-cl-beta" />
                                            <p className="font-medium text-foreground">No participants yet</p>
                                            <p className="mt-1 text-sm text-muted-foreground">Registrations will appear here.</p>
                                        </td>
                                    </tr>
                                )}
                                {participants.map((participant) => (
                                    <tr key={participant.id} className="transition-colors hover:bg-alpha/2">
                                        <td className="px-6 py-4 font-semibold text-foreground">{participant.first_name}</td>
                                        <td className="px-6 py-4 text-foreground">{participant.last_name}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            <span className="inline-flex items-center gap-1">
                                                <Mail className="h-3.5 w-3.5" />
                                                {participant.email}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            <span className="inline-flex items-center gap-1">
                                                <Phone className="h-3.5 w-3.5" />
                                                {participant.phone}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block rounded-full bg-alpha/10 px-2.5 py-0.5 text-xs font-medium text-alpha">
                                                <TransText {...participant.event.title} />
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(participant.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="rounded-lg"
                                                    onClick={() => setDeleteId(participant.id)}
                                                >
                                                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ConfirmDeleteDialog
                open={deleteId !== null}
                onOpenChange={(val) => { if (!val) setDeleteId(null); }}
                onConfirm={handleDelete}
                processing={deleting}
                title="Delete Participant"
                description="Are you sure you want to remove this participant? This action cannot be undone."
            />

            <AlertSuccess message={flash?.success} />
        </AppLayout>
    );
}
