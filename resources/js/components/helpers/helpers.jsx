/**
 * Generates a URL slug from a title string for the given locale.
 * - Lowercase, spaces to hyphens, special characters stripped.
 * - For AR: preserve Arabic characters only; for FR/NL: alphanumeric + hyphens.
 */
export function slugFromTitle(title, locale) {
    if (!title || typeof title !== 'string') return '';
    const trimmed = title.trim();
    if (!trimmed) return '';

    if (locale === 'ar') {
        // Preserve Arabic letters (and numbers), strip everything else, collapse spaces to single hyphen
        const arabicAndNumbers = trimmed.replace(/[^\p{Script=Arabic}\p{N}\s]/gu, ' ');
        return arabicAndNumbers
            .replace(/\s+/g, '-')
            .replace(/^-|-$/g, '')
            .toLowerCase();
    }

    // FR / NL: lowercase, replace spaces with hyphens, strip non-alphanumeric (allow hyphen)
    return trimmed
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\u00C0-\u024F\-]/g, '') // allow Latin extended (accents)
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Debounces a function by the given delay in ms.
 */
export function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}
