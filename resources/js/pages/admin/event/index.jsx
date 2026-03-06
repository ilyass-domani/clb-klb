import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CalendarDays, Edit, MapPin, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import ConfirmDeleteDialog from '@/components/confirm-delete-dialog';
import AlertSuccess from '@/components/alert-success';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Events', href: '/admin/events' },
];

export default function AdminEventIndex({ events }) {
    const { flash } = usePage().props;
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);
        router.delete(`/admin/events/${deleteId}`, {
            onFinish: () => {
                setDeleting(false);
                setDeleteId(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Events" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold italic text-foreground lg:text-3xl">Events</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage and organize your events</p>
                    </div>
                    <Button asChild className="bg-alpha text-white shadow-md hover:bg-alpha/90">
                        <Link href="/admin/events/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Event
                        </Link>
                    </Button>
                </div>

                {/* Events Table */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="border-b bg-alpha/5 px-6 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-alpha">
                            {events.length} {events.length === 1 ? 'Event' : 'Events'}
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Title</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Time</th>
                                    <th className="px-6 py-4 font-semibold">Location</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {events.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center">
                                            <CalendarDays className="mx-auto mb-3 h-10 w-10 text-cl-beta" />
                                            <p className="font-medium text-foreground">No events yet</p>
                                            <p className="mt-1 text-sm text-muted-foreground">Create your first event to get started.</p>
                                        </td>
                                    </tr>
                                )}
                                {events.map((event) => (
                                    <tr key={event.id} className="transition-colors hover:bg-alpha/[0.02]">
                                        <td className="px-6 py-4 font-semibold text-foreground">{event.title?.fr || event.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block rounded-full bg-alpha/10 px-2.5 py-0.5 text-xs font-medium text-alpha">
                                                {event.categorie?.fr || event.categorie}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{event.date}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{event.time}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {event.location}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-foreground">
                                                {event.price > 0 ? `${event.price} DH` : 'Free'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="outline" size="sm" className="rounded-lg" asChild>
                                                    <Link href={`/admin/events/${event.id}/edit`}>
                                                        <Edit className="mr-1 h-3.5 w-3.5" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="rounded-lg"
                                                    onClick={() => setDeleteId(event.id)}
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
                title="Delete Event"
                description="Are you sure you want to delete this event? All participants registered to this event will also be removed. This action cannot be undone."
            />

            <AlertSuccess message={flash?.success} />
        </AppLayout>
    );
}
