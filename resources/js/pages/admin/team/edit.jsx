import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Team', href: '/admin/team' },
    { title: 'Edit', href: '#' },
];

export default function AdminTeamEdit({ teamMember }) {
    const { data, setData, post, processing, errors } = useForm({
        name: teamMember.name,
        category: teamMember.category || 'bureau',
        image: null,
        position: teamMember.position || '',
        sort_order: String(teamMember.sort_order ?? ''),
        social_link: teamMember.social_link || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/team/${teamMember.id}`, {
            forceFormData: true,
            _method: 'put',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit team member" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground italic lg:text-3xl">
                            Edit team member
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Update photo and details.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl space-y-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                                    <img
                                        src={
                                            teamMember.image_url ??
                                            teamMember.image_path
                                        }
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Current photo. Upload a new file below to
                                    replace.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="rounded-lg"
                                />
                                {errors.name && (
                                    <p className="text-xs text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <select
                                    id="category"
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                >
                                    <option value="bureau">Bureau</option>
                                    <option value="honorary">Honorary</option>
                                </select>
                                {errors.category && (
                                    <p className="text-xs text-destructive">
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">
                                    New photo (optional)
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="rounded-lg border-dashed file:mr-3 file:rounded-lg file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium"
                                />
                                {errors.image && (
                                    <p className="text-xs text-destructive">
                                        {errors.image}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">
                                    Position (optional)
                                </Label>
                                <Input
                                    id="position"
                                    value={data.position}
                                    onChange={(e) =>
                                        setData('position', e.target.value)
                                    }
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sort_order">
                                    Display order
                                </Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    min={0}
                                    value={data.sort_order}
                                    onChange={(e) =>
                                        setData('sort_order', e.target.value)
                                    }
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="social_link">
                                    Social link (optional)
                                </Label>
                                <Input
                                    id="social_link"
                                    type="url"
                                    value={data.social_link}
                                    onChange={(e) =>
                                        setData('social_link', e.target.value)
                                    }
                                    placeholder="https://..."
                                    className="rounded-lg"
                                />
                                {errors.social_link && (
                                    <p className="text-xs text-destructive">
                                        {errors.social_link}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-lg"
                            asChild
                        >
                            <Link href="/admin/team">Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-alpha text-white hover:bg-alpha/90"
                        >
                            {processing ? 'Saving…' : 'Save changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
