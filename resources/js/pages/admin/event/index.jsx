import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CalendarDays, Edit, MapPin, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Table } from '@/components';
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
                        <h1 className="text-2xl font-bold text-foreground italic lg:text-3xl">
                            {events.length}{' '}
                            {events.length <= 1 ? 'Event' : 'Events'}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage and organize your events
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-alpha text-white shadow-md hover:bg-alpha/90"
                    >
                        <Link href="/admin/events/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Event
                        </Link>
                    </Button>
                </div>

                {/* Events Table */}
                <Table
                    data={events}
                    columns={[
                        {
                            header: 'Title',
                            cellClassName: 'font-semibold text-foreground',
                            render: (event) => event.title.fr,
                        },
                        {
                            header: 'Category',
                            render: (event) => (
                                <span className="inline-block rounded-full bg-alpha/10 px-2.5 py-0.5 text-xs font-medium text-alpha">
                                    {event.category.fr}
                                </span>
                            ),
                        },
                        {
                            header: 'Date',
                            render: (event) => event.date,
                        },
                        {
                            header: 'Time',
                            render: (event) => event.time,
                        },
                        {
                            header: 'Location',
                            render: (event) => (
                                <span className="inline-flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {event.location}
                                </span>
                            ),
                        },
                        {
                            header: 'Price',
                            cellClassName: 'font-semibold text-foreground',
                            render: (event) =>
                                Number(event.price ?? 0) > 0
                                    ? `${event.price}`
                                    : 'Free',
                        },
                        {
                            header: 'Actions',
                            headerClassName: 'text-right',
                            cellClassName: 'text-right',
                            render: (event) => (
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-lg"
                                        asChild
                                    >
                                        <Link
                                            href={`/admin/events/${event.id}/edit`}
                                        >
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
                            ),
                        },
                    ]}
                    emptyState={
                        <>
                            <CalendarDays className="mx-auto mb-3 size-10 text-muted-foreground" />
                            <p className="font-medium text-foreground">
                                No events yet
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Add your first event to get started.
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
                title="Delete Event"
                description="Are you sure you want to delete this event? All participants registered to this event will also be removed. This action cannot be undone."
            />

            <AlertSuccess message={flash?.success} />
        </AppLayout>
    );
}
