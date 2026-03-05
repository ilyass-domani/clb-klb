import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, Edit, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Events', href: '/admin/events' },
];

export default function AdminEventIndex({ events }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(`/admin/events/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Events" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Events</h1>
                    <Button asChild>
                        <Link href="/admin/events/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Event
                        </Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">Title</th>
                                <th className="px-4 py-3 font-medium">Category</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Time</th>
                                <th className="px-4 py-3 font-medium">Location</th>
                                <th className="px-4 py-3 font-medium">Price</th>
                                <th className="px-4 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                                        <CalendarDays className="mx-auto mb-2 h-8 w-8" />
                                        No events found. Create your first event.
                                    </td>
                                </tr>
                            )}
                            {events.map((event) => (
                                <tr key={event.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="px-4 py-3 font-medium">{event.title}</td>
                                    <td className="px-4 py-3">{event.categorie}</td>
                                    <td className="px-4 py-3">{event.date}</td>
                                    <td className="px-4 py-3">{event.time}</td>
                                    <td className="px-4 py-3">{event.location}</td>
                                    <td className="px-4 py-3">{event.price > 0 ? `${event.price} DH` : 'Free'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/events/${event.id}/edit`}>
                                                    <Edit className="mr-1 h-3.5 w-3.5" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(event.id)}
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
        </AppLayout>
    );
}
