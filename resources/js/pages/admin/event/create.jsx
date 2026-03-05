import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Events', href: '/admin/events' },
    { title: 'Create', href: '/admin/events/create' },
];

export default function AdminEventCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        date: '',
        time: '',
        categorie: '',
        price: 0,
        image: '',
        location: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/events');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Event" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Create Event</h1>
                </div>

                <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-6 rounded-lg border p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="categorie">Category</Label>
                            <Input
                                id="categorie"
                                value={data.categorie}
                                onChange={(e) => setData('categorie', e.target.value)}
                            />
                            {errors.categorie && <p className="text-sm text-destructive">{errors.categorie}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            rows={4}
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                            />
                            {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                id="time"
                                type="time"
                                value={data.time}
                                onChange={(e) => setData('time', e.target.value)}
                            />
                            {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                            />
                            {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price (DH)</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                value={data.price}
                                onChange={(e) => setData('price', parseInt(e.target.value) || 0)}
                            />
                            {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            value={data.image}
                            onChange={(e) => setData('image', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <Button variant="outline" type="button" asChild>
                            <Link href="/admin/events">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Event'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
