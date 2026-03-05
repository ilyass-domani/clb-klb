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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TipTapEditor from '@/components/TipTapEditor';
import { slugFromTitle, debounce } from '@/components/helpers/helpers';

const LOCALES = [
    { key: 'ar', label: 'AR' },
    { key: 'fr', label: 'FR' },
    { key: 'nl', label: 'NL' },
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
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Blog</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            {LOCALES.map(({ key, label }) => (
                                <TabsTrigger
                                    key={key}
                                    value={key}
                                    className={hasTabError(key) ? 'text-destructive data-[state=active]:text-destructive' : ''}
                                >
                                    {label}
                                    {hasTabError(key) && (
                                        <span className="ml-1 size-2 rounded-full bg-destructive" aria-hidden />
                                    )}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {LOCALES.map((locale) => (
                            <TabsContent key={locale} value={locale} className="space-y-4 mt-4">
                                <div>
                                    <Label htmlFor={`title-${locale}`}>Title</Label>
                                    <Input
                                        id={`title-${locale}`}
                                        value={data.title[locale] ?? ''}
                                        onChange={(e) => handleTitleChange(locale, e.target.value)}
                                        className="mt-1"
                                        aria-invalid={!!errors?.[`title.${locale}`]}
                                    />
                                    {errors?.[`title.${locale}`] && (
                                        <p className="mt-1 text-sm text-destructive">{errors[`title.${locale}`]}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor={`slug-${locale}`}>Slug</Label>
                                    <Input
                                        id={`slug-${locale}`}
                                        value={data.slug[locale] ?? ''}
                                        onChange={(e) => handleSlugChange(locale, e.target.value)}
                                        className="mt-1"
                                        aria-invalid={!!errors?.[`slug.${locale}`]}
                                    />
                                    {errors?.[`slug.${locale}`] && (
                                        <p className="mt-1 text-sm text-destructive">{errors[`slug.${locale}`]}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>Content</Label>
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
                            </TabsContent>
                        ))}
                    </Tabs>
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
