import { useState, useEffect, useRef } from 'react';
import { useForm, router } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TipTapEditor from '@/components/TipTapEditor';
import { slugFromTitle, debounce } from '@/components/helpers/helpers';
import { cn } from '@/lib/utils';

const LOCALES = [
    { key: 'ar', label: 'Arabic (اللغة العربية)' },
    { key: 'fr', label: 'Français' },
    { key: 'nl', label: 'Nederlands' },
];

const emptyLocale = () => ({ ar: '', fr: '', nl: '' });

export default function EditBlogModal({ blog, open, onOpenChange }) {
    const [activeTab, setActiveTab] = useState('ar');
    const [slugManuallyEdited, setSlugManuallyEdited] = useState({
        ar: false,
        fr: false,
        nl: false,
    });

    const initialTitle = blog?.title ?? emptyLocale();
    const initialSlug = blog?.slug ?? emptyLocale();
    const initialBody = blog?.body ?? emptyLocale();

    const { data, setData, put, processing, errors } = useForm({
        image: null,
        title: { ...initialTitle },
        slug: { ...initialSlug },
        body: { ...initialBody },
    });

    useEffect(() => {
        if (open && blog) {
            setData('image', null);
            setData('title', { ...(blog.title ?? emptyLocale()) });
            setData('slug', { ...(blog.slug ?? emptyLocale()) });
            setData('body', { ...(blog.body ?? emptyLocale()) });
            setSlugManuallyEdited({ ar: false, fr: false, nl: false });
        }
    }, [open, blog?.id]);

    const dataRef = useRef(data);
    const slugManuallyEditedRef = useRef(slugManuallyEdited);
    dataRef.current = data;
    slugManuallyEditedRef.current = slugManuallyEdited;

    const debouncedSlugUpdate = useRef({
        ar: debounce((title) => {
            if (slugManuallyEditedRef.current.ar) return;
            setData('slug', {
                ...dataRef.current.slug,
                ar: slugFromTitle(title, 'ar'),
            });
        }, 300),
        fr: debounce((title) => {
            if (slugManuallyEditedRef.current.fr) return;
            setData('slug', {
                ...dataRef.current.slug,
                fr: slugFromTitle(title, 'fr'),
            });
        }, 300),
        nl: debounce((title) => {
            if (slugManuallyEditedRef.current.nl) return;
            setData('slug', {
                ...dataRef.current.slug,
                nl: slugFromTitle(title, 'nl'),
            });
        }, 300),
    }).current;

    const handleTitleChange = (locale, value) => {
        setData('title', { ...data.title, [locale]: value });
        debouncedSlugUpdate[locale](value);
    };

    const handleSlugChange = (locale, value) => {
        setSlugManuallyEdited((prev) => ({ ...prev, [locale]: true }));
        setData('slug', { ...data.slug, [locale]: value });
    };

    const hasTabError = (locale) =>
        errors?.[`title.${locale}`] ||
        errors?.[`slug.${locale}`] ||
        errors?.[`body.${locale}`];

    const canSubmit = () => {
        for (const { key } of LOCALES) {
            if (!(data.title[key]?.trim() && data.body[key]?.trim()))
                return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!blog?.id) return;
        const url = `/admin/blogs/${blog.id}`;
        if (data.image instanceof File) {
            router.post(
                url,
                { _method: 'PUT', ...data },
                { forceFormData: true, onSuccess: () => onOpenChange(false) },
            );
        } else {
            put(url, { onSuccess: () => onOpenChange(false) });
        }
    };

    if (!blog) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] !w-[80vw] !max-w-[80vw] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Blog</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <Label>Image</Label>
                        {blog?.image && (
                            <div className="mb-2">
                                <img
                                    src={blog.image}
                                    alt=""
                                    className="h-24 w-auto rounded border border-border object-cover"
                                />
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Current image
                                </p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData('image', e.target.files?.[0] ?? null)
                            }
                            className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-alpha file:px-4 file:py-2 file:text-sm file:font-medium file:text-cl-white file:hover:opacity-90"
                        />
                        {errors?.image && (
                            <p className="text-sm text-destructive">
                                {errors.image}
                            </p>
                        )}
                        {data.image && (
                            <p className="text-xs text-muted-foreground">
                                New: {data.image.name} (
                                {(data.image.size / 1024).toFixed(1)} KB)
                            </p>
                        )}
                    </div>
                    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                        {LOCALES.map(({ key, label }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActiveTab(key)}
                                className={cn(
                                    'inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
                                    activeTab === key
                                        ? 'bg-background text-foreground shadow'
                                        : 'hover:text-foreground',
                                    hasTabError(key) && 'text-destructive',
                                )}
                            >
                                {label}
                                {hasTabError(key) && (
                                    <span
                                        className="ml-1 size-2 rounded-full bg-destructive"
                                        aria-hidden
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[280px] space-y-4">
                        {LOCALES.map((locale) => (
                            <div
                                key={locale}
                                className={cn(
                                    'space-y-4',
                                    activeTab !== locale && 'hidden',
                                )}
                                role="tabpanel"
                                aria-hidden={activeTab !== locale}
                            >
                                <div>
                                    <Label htmlFor={`edit-title-${locale}`}>
                                        Title
                                    </Label>
                                    <Input
                                        id={`edit-title-${locale}`}
                                        value={data.title[locale] ?? ''}
                                        onChange={(e) =>
                                            handleTitleChange(
                                                locale,
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                        aria-invalid={
                                            !!errors?.[`title.${locale}`]
                                        }
                                    />
                                    {errors?.[`title.${locale}`] && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors[`title.${locale}`]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor={`edit-slug-${locale}`}>
                                        Slug
                                    </Label>
                                    <Input
                                        id={`edit-slug-${locale}`}
                                        value={data.slug[locale] ?? ''}
                                        onChange={(e) =>
                                            handleSlugChange(
                                                locale,
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                        aria-invalid={
                                            !!errors?.[`slug.${locale}`]
                                        }
                                    />
                                    {errors?.[`slug.${locale}`] && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors[`slug.${locale}`]}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label>Content</Label>
                                    <div className="mt-1">
                                        <TipTapEditor
                                            key={`${blog.id}-${locale}`}
                                            value={data.body[locale] ?? ''}
                                            onChange={(html) =>
                                                setData('body', {
                                                    ...data.body,
                                                    [locale]: html,
                                                })
                                            }
                                            placeholder={`Content in ${locale}`}
                                        />
                                    </div>
                                    {errors?.[`body.${locale}`] && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors[`body.${locale}`]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || !canSubmit()}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
