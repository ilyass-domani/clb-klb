import { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import TipTapEditor from '@/components/TipTapEditor';
import { slugFromTitle, debounce } from '@/components/helpers/helpers';
import { cn } from '@/lib/utils';

const LOCALES = [
    { key: 'ar', label: 'Arabic (اللغة العربية)' },
    { key: 'fr', label: 'Français' },
    { key: 'nl', label: 'Nederlands' },
];

const emptyLocale = () => ({ ar: '', fr: '', nl: '' });

export default function CreateBlogModal({ open, onOpenChange }) {
    const [activeTab, setActiveTab] = useState('ar');
    const [slugManuallyEdited, setSlugManuallyEdited] = useState({ ar: false, fr: false, nl: false });

    const { data, setData, post, processing, errors, reset } = useForm({
        title: emptyLocale(),
        slug: emptyLocale(),
        body: emptyLocale(),
    });

    useEffect(() => {
        if (!open) {
            reset();
            setSlugManuallyEdited({ ar: false, fr: false, nl: false });
        }
    }, [open, reset]);

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
        errors?.[`title.${locale}`] || errors?.[`slug.${locale}`] || errors?.[`body.${locale}`];

    const canSubmit = () => {
        for (const { key } of LOCALES) {
            if (!(data.title[key]?.trim() && data.body[key]?.trim())) return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/blogs', {
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!w-[80vw] !max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Blog</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Simple tab buttons (no Radix Tabs - avoids portal/context issues inside Dialog) */}
                    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                        {LOCALES.map(({ key, label }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActiveTab(key)}
                                className={cn(
                                    'inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                                    activeTab === key
                                        ? 'bg-background text-foreground shadow'
                                        : 'hover:text-foreground',
                                    hasTabError(key) && 'text-destructive'
                                )}
                            >
                                {label}
                                {hasTabError(key) && (
                                    <span className="ml-1 size-2 rounded-full bg-destructive" aria-hidden />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Only render the active panel (no hidden – ensures something is always visible) */}
                    <div className="min-h-[280px] space-y-4">
                        {(() => {
                            const locale = activeTab;
                            return (
                                <div key={locale} className="space-y-4">
                                    <div>
                                        <label htmlFor={`title-${locale}`} className="text-sm font-medium leading-none">
                                            Title
                                        </label>
                                        <input
                                            id={`title-${locale}`}
                                            type="text"
                                            value={data.title[locale] ?? ''}
                                            onChange={(e) => handleTitleChange(locale, e.target.value)}
                                            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                                        />
                                        {errors?.[`title.${locale}`] && (
                                            <p className="mt-1 text-sm text-destructive">{errors[`title.${locale}`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor={`slug-${locale}`} className="text-sm font-medium leading-none">
                                            Slug
                                        </label>
                                        <input
                                            id={`slug-${locale}`}
                                            type="text"
                                            value={data.slug[locale] ?? ''}
                                            onChange={(e) => handleSlugChange(locale, e.target.value)}
                                            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                                        />
                                        {errors?.[`slug.${locale}`] && (
                                            <p className="mt-1 text-sm text-destructive">{errors[`slug.${locale}`]}</p>
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium leading-none">Content</span>
                                        <div className="mt-1">
                                            <TipTapEditor
                                                value={data.body[locale] ?? ''}
                                                onChange={(html) => setData('body', { ...data.body, [locale]: html })}
                                                placeholder={`Content in ${locale}`}
                                            />
                                        </div>
                                        {errors?.[`body.${locale}`] && (
                                            <p className="mt-1 text-sm text-destructive">{errors[`body.${locale}`]}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing || !canSubmit()}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
