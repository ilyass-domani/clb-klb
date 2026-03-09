import { usePage } from '@inertiajs/react';

const SUPPORTED = ['fr', 'ar', 'nl'];
const DEFAULT = 'fr';

/**
 * Renders the text for the current language selected in the navbar.
 * Pass the same content in French, Arabic, and Dutch; the component shows the one matching the selection.
 *
 * @example
 *   <TransText fr="À propos de nous" ar="عنا" nl="Over ons" />
 *   <TransText fr="Contact" ar="اتصل" nl="Contact" as="h1" className="text-2xl" />
 *
 * @param {string} fr - Text in French
 * @param {string} ar - Text in Arabic
 * @param {string} nl - Text in Dutch (Nederlands)
 * @param {string} [as='span'] - HTML tag to render (span, h1, p, etc.)
 * @param {string} [className] - Optional CSS classes
 */
export default function TransText({
    fr,
    ar,
    nl,
    as: Tag = 'span',
    className,
    ...rest
}) {
    const { props } = usePage();
    const locale =
        props.locale && SUPPORTED.includes(props.locale)
            ? props.locale
            : DEFAULT;

    const text = { fr, ar, nl }[locale] ?? fr ?? ar ?? nl ?? '';

    return (
        <Tag className={className} {...rest}>
            {text}
        </Tag>
    );
}
