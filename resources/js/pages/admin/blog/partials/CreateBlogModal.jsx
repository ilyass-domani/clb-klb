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
    { key: 'ar', label: 'AR', fullLabel: 'Arabic' },
    { key: 'fr', label: 'FR', fullLabel: 'Français' },
    { key: 'nl', label: 'NL', fullLabel: 'Nederlands' },
];

const emptyLocale = () => ({ ar: '', fr: '', nl: '' });

function FieldError({ id, message }) {
    if (!message) return null;
    return (
        <p
            id={id}
            className="mt-1 flex items-center gap-1.5 text-xs text-destructive"
        >
            <svg
                className="h-3 w-3 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                />
            </svg>
            {message}
        </p>
    );
}

function FieldLabel({ children, className }) {
    return (
        <span className={cn('mb-1.5 block text-xs text-muted-foreground', className)}>
            {children}
        </span>
    );
}

export default function CreateBlogModal({ open, onOpenChange }) {
    const [activeTab, setActiveTab] = useState('ar');
    const [slugManuallyEdited, setSlugManuallyEdited] = useState({
        ar: false,
        fr: false,
        nl: false,
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
        title: emptyLocale(),
        slug: emptyLocale(),
        body: emptyLocale(),
    });

    useEffect(() => {
        if (!open) {
            reset();
            setActiveTab('ar');
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
        errors?.[`title.${locale}`] ||
        errors?.[`slug.${locale}`] ||
        errors?.[`body.${locale}`];

    const completedLocales = LOCALES.filter(
        ({ key }) => data.title[key]?.trim() && data.body[key]?.trim(),
    ).length;

    const canSubmit = () => completedLocales === LOCALES.length;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/blogs', { onSuccess: () => onOpenChange(false) });
    };

    const locale = activeTab;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[92vh] !w-[82vw] !max-w-[82vw] flex-col gap-0 overflow-hidden p-0">
                {/* ── Header ── */}
                <DialogHeader className="flex-shrink-0 border-b border-border px-6 pt-6 pb-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <DialogTitle className="text-lg">
                                New Blog Post
                            </DialogTitle>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                Fill in all three languages to publish.
                            </p>
                        </div>
                        {/* Progress pills */}
                        <div className="flex items-center gap-1.5 pt-0.5">
                            {LOCALES.map(({ key, label }) => {
                                const done =
                                    data.title[key]?.trim() &&
                                    data.body[key]?.trim();
                                return (
                                    <span
                                        key={key}
                                        className={cn(
                                            'inline-flex items-center rounded-full px-2 py-0.5 text-xs transition-colors',
                                            done
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                                                : 'bg-muted text-muted-foreground',
                                        )}
                                    >
                                        {done && (
                                            <svg
                                                className="mr-1 h-2.5 w-2.5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </DialogHeader>

                {/* ── Scrollable body ── */}
                <form
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col overflow-hidden"
                >
                    {/* Language tab bar */}
                    <div className="flex flex-shrink-0 items-center gap-1 border-b border-border bg-muted/30 px-6 py-3">
                        {LOCALES.map(({ key, label, fullLabel }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActiveTab(key)}
                                className={cn(
                                    'relative inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm transition-all duration-150',
                                    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none',
                                    activeTab === key
                                        ? 'border border-border bg-background text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
                                )}
                            >
                                <span className="text-xs">
                                    {label}
                                </span>
                                <span className="hidden text-xs opacity-70 sm:inline">
                                    {fullLabel}
                                </span>
                                {hasTabError(key) && (
                                    <span
                                        className="absolute -top-1 -right-1 size-2 rounded-full bg-destructive ring-2 ring-background"
                                        aria-hidden
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Fields */}
                    <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
                        {/* Cover image */}
                        <div>
                            <FieldLabel>Cover Image</FieldLabel>
                            <label
                                htmlFor="create-blog-image"
                                className={cn(
                                    'group flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all duration-200',
                                    data.image
                                        ? 'border-border bg-muted/30 px-5 py-3'
                                        : 'border-input px-5 py-7 hover:border-foreground/40 hover:bg-muted/20',
                                )}
                            >
                                <input
                                    id="create-blog-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="sr-only"
                                />
                                {data.image ? (
                                    <div className="flex w-full items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground/10">
                                            <svg
                                                className="h-4 w-4 text-foreground/60"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h.008v.008H3V9.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm text-foreground">
                                                {data.image.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {(
                                                    data.image.size / 1024
                                                ).toFixed(1)}{' '}
                                                KB · Click to replace
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-1.5 text-center">
                                        <svg
                                            className="h-7 w-7 text-muted-foreground/40"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                            />
                                        </svg>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="text-foreground">
                                                Click to upload
                                            </span>{' '}
                                            or drag & drop
                                        </p>
                                        <p className="text-xs text-muted-foreground/60">
                                            PNG, JPG, WebP — max 2 MB
                                        </p>
                                    </div>
                                )}
                            </label>
                            <FieldError
                                id="create-blog-image-error"
                                message={errors?.image}
                            />
                        </div>

                        <div className="h-px bg-border/50" />

                        {/* Title */}
                        <div>
                            <FieldLabel>
                                <label htmlFor={`title-${locale}`}>Title</label>
                            </FieldLabel>
                            <input
                                id={`title-${locale}`}
                                type="text"
                                value={data.title[locale] ?? ''}
                                onChange={(e) =>
                                    handleTitleChange(locale, e.target.value)
                                }
                                placeholder={`Post title in ${locale}…`}
                                className={cn(
                                    'flex h-10 w-full rounded-lg border bg-transparent px-3.5 py-2 text-sm placeholder:text-muted-foreground/40',
                                    'transition-all duration-150 outline-none',
                                    'focus:border-ring/60 focus:ring-2 focus:ring-ring/40',
                                    errors?.[`title.${locale}`]
                                        ? 'border-destructive focus:ring-destructive/20'
                                        : 'border-input hover:border-foreground/30',
                                )}
                            />
                            <FieldError message={errors?.[`title.${locale}`]} />
                        </div>

                        {/* Slug */}
                        <div>
                            <FieldLabel>
                                <label htmlFor={`slug-${locale}`}>Slug</label>
                            </FieldLabel>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-muted-foreground/50 select-none">
                                    /
                                </span>
                                <input
                                    id={`slug-${locale}`}
                                    type="text"
                                    value={data.slug[locale] ?? ''}
                                    onChange={(e) =>
                                        handleSlugChange(locale, e.target.value)
                                    }
                                    placeholder="my-post-slug"
                                    className={cn(
                                        'flex h-10 w-full rounded-lg border bg-transparent py-2 pr-3.5 pl-6 text-sm placeholder:text-muted-foreground/40',
                                        'transition-all duration-150 outline-none',
                                        'focus:border-ring/60 focus:ring-2 focus:ring-ring/40',
                                        errors?.[`slug.${locale}`]
                                            ? 'border-destructive focus:ring-destructive/20'
                                            : 'border-input hover:border-foreground/30',
                                    )}
                                />
                            </div>
                            <FieldError message={errors?.[`slug.${locale}`]} />
                        </div>

                        <div className="h-px bg-border/50" />

                        {/* Content */}
                        <div>
                            <FieldLabel>Content</FieldLabel>
                            <div
                                className={cn(
                                    'rounded-lg border transition-all duration-150',
                                    'focus-within:border-ring/60 focus-within:ring-2 focus-within:ring-ring/40',
                                    errors?.[`body.${locale}`]
                                        ? 'border-destructive focus-within:ring-destructive/20'
                                        : 'border-input hover:border-foreground/30',
                                )}
                            >
                                <TipTapEditor
                                    key={locale}
                                    value={data.body[locale] ?? ''}
                                    onChange={(html) =>
                                        setData('body', {
                                            ...data.body,
                                            [locale]: html,
                                        })
                                    }
                                    placeholder={`Write your content in ${locale}…`}
                                />
                            </div>
                            <FieldError message={errors?.[`body.${locale}`]} />
                        </div>
                    </div>

                    {/* ── Footer ── */}
                    <DialogFooter className="flex flex-shrink-0 items-center justify-between gap-3 border-t border-border bg-muted/20 px-6 py-4">
                        <p className="text-xs text-muted-foreground">
                            {completedLocales} / {LOCALES.length} languages
                            complete
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={processing || !canSubmit()}
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="h-3.5 w-3.5 animate-spin"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            />
                                        </svg>
                                        Publishing…
                                    </span>
                                ) : (
                                    'Publish'
                                )}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
