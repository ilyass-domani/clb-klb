import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

/**
 * Sets document direction (RTL for Arabic) and lang based on the locale selected in the navbar.
 * Renders nothing; only side effect on document.documentElement.
 */
export default function SetDocumentDirection() {
    const { props } = usePage();
    const locale =
        props.locale && ['fr', 'ar', 'nl'].includes(props.locale)
            ? props.locale
            : 'fr';

    useEffect(() => {
        const dir = locale === 'ar' ? 'rtl' : 'ltr';
        const lang = locale === 'ar' ? 'ar' : locale === 'nl' ? 'nl' : 'fr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', lang);
        return () => {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.removeAttribute('lang');
        };
    }, [locale]);

    return null;
}
