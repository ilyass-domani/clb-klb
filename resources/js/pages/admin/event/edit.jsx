import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LANGS = [
    { code: 'fr', label: 'French' },
    { code: 'ar', label: 'Arabic' },
    { code: 'nl', label: 'Dutch' },
];

function transValue(field) {
    if (field && typeof field === 'object')
        return { fr: field.fr || '', ar: field.ar || '', nl: field.nl || '' };
    return { fr: field || '', ar: '', nl: '' };
}

export default function AdminEventEdit({ event }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Events', href: '/admin/events' },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: transValue(event.title),
        description: transValue(event.description),
        date: event.date || '',
        time: event.time || '',
        categorie: transValue(event.categorie),
        price: event.price || 0,
        image: null,
        location: event.location || '',
    });

    const setTransField = (field, lang, value) => {
        setData(field, { ...data[field], [lang]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/events/${event.id}`, {
            forceFormData: true,
            _method: 'put',
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Event" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground italic lg:text-3xl">
                        Edit Event
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the event details below
                    </p>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="grid w-full max-w-7xl gap-6 xl:grid-cols-2"
                >
                    {/* Title */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                        <div className="border-b bg-alpha/5 px-6 py-3">
                            <p className="text-xs font-semibold tracking-wider text-alpha uppercase">
                                Title
                            </p>
                        </div>
                        <div className="grid gap-4 p-6 md:grid-cols-3">
                            {LANGS.map((lang) => (
                                <div key={lang.code} className="space-y-1.5">
                                    <Label htmlFor={`title_${lang.code}`}>
                                        {lang.label}
                                    </Label>
                                    <Input
                                        id={`title_${lang.code}`}
                                        className="rounded-lg"
                                        value={data.title[lang.code]}
                                        onChange={(e) =>
                                            setTransField(
                                                'title',
                                                lang.code,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors[`title.${lang.code}`] && (
                                        <p className="text-xs text-destructive">
                                            {errors[`title.${lang.code}`]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                        <div className="border-b bg-alpha/5 px-6 py-3">
                            <p className="text-xs font-semibold tracking-wider text-alpha uppercase">
                                Category
                            </p>
                        </div>
                        <div className="grid gap-4 p-6 md:grid-cols-3">
                            {LANGS.map((lang) => (
                                <div key={lang.code} className="space-y-1.5">
                                    <Label htmlFor={`categorie_${lang.code}`}>
                                        {lang.label}
                                    </Label>
                                    <Input
                                        id={`categorie_${lang.code}`}
                                        className="rounded-lg"
                                        value={data.categorie[lang.code]}
                                        onChange={(e) =>
                                            setTransField(
                                                'categorie',
                                                lang.code,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors[`categorie.${lang.code}`] && (
                                        <p className="text-xs text-destructive">
                                            {errors[`categorie.${lang.code}`]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                        <div className="border-b bg-alpha/5 px-6 py-3">
                            <p className="text-xs font-semibold tracking-wider text-alpha uppercase">
                                Description
                            </p>
                        </div>
                        <div className="space-y-4 p-6">
                            {LANGS.map((lang) => (
                                <div key={lang.code} className="space-y-1.5">
                                    <Label htmlFor={`description_${lang.code}`}>
                                        {lang.label}
                                    </Label>
                                    <textarea
                                        id={`description_${lang.code}`}
                                        rows={3}
                                        className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                        value={data.description[lang.code]}
                                        onChange={(e) =>
                                            setTransField(
                                                'description',
                                                lang.code,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors[`description.${lang.code}`] && (
                                        <p className="text-xs text-destructive">
                                            {errors[`description.${lang.code}`]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                        <div className="border-b bg-alpha/5 px-6 py-3">
                            <p className="text-xs font-semibold tracking-wider text-alpha uppercase">
                                Event Details
                            </p>
                        </div>
                        <div className="space-y-4 p-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        className="rounded-lg"
                                        value={data.date}
                                        onChange={(e) =>
                                            setData('date', e.target.value)
                                        }
                                    />
                                    {errors.date && (
                                        <p className="text-xs text-destructive">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="time">Time</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        className="rounded-lg"
                                        value={data.time}
                                        onChange={(e) =>
                                            setData('time', e.target.value)
                                        }
                                    />
                                    {errors.time && (
                                        <p className="text-xs text-destructive">
                                            {errors.time}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        className="rounded-lg"
                                        value={data.location}
                                        onChange={(e) =>
                                            setData('location', e.target.value)
                                        }
                                    />
                                    {errors.location && (
                                        <p className="text-xs text-destructive">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        className="rounded-lg"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData(
                                                'price',
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                    />
                                    {errors.price && (
                                        <p className="text-xs text-destructive">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="rounded-lg"
                                    onChange={(e) =>
                                        setData('image', e.target.files[0] ?? null)
                                    }
                                />
                                {errors.image && (
                                    <p className="text-xs text-destructive">
                                        {errors.image}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pb-6">
                        <Button
                            variant="outline"
                            type="button"
                            className="rounded-lg"
                            asChild
                        >
                            <Link href="/admin/events">Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-alpha text-white shadow-md hover:bg-alpha/90"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
