import { Link, usePage, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { TransText } from '@/components';
import { GOOGLE_FORM_URL } from '@/lib/consts';

const navLinks = [
    {
        key: 'home',
        href: '/',
        hasDropdown: false,
        fr: 'ACCUEIL',
        ar: 'الرئيسية',
        nl: 'HOME',
    },
    {
        key: 'about',
        href: '/a-propos',
        hasDropdown: false,
        fr: 'À PROPOS',
        ar: 'عنا',
        nl: 'OVER ONS',
    },
    {
        key: 'news',
        hasDropdown: true,
        fr: 'Actualités',
        ar: 'أخبار',
        nl: 'Nieuws',
        items: [
            {
                key: 'events',
                href: '/events',
                fr: 'Événements',
                ar: 'فعاليات',
                nl: 'Evenementen',
            },
            {
                key: 'blogs',
                href: '/blogs',
                fr: 'Blog',
                ar: 'مدونة',
                nl: 'Blog',
            },
        ],
    },
    {
        key: 'contact',
        href: '/contact',
        hasDropdown: false,
        fr: 'CONTACT',
        ar: 'اتصل',
        nl: 'CONTACT',
    },
];

const LOCALES = [
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'العربية' },
    { code: 'nl', label: 'NL' },
];

export default function Navbar() {
    const { props } = usePage();
    const locale =
        props.locale && ['fr', 'ar', 'nl'].includes(props.locale)
            ? props.locale
            : 'fr';
    const [open, setOpen] = useState(false);
    const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const ref = useRef(null);
    const newsRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
            if (newsRef.current && !newsRef.current.contains(e.target))
                setNewsDropdownOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (mobileOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    function setLocale(code) {
        if (code === locale) return;
        router.post('/locale', { locale: code }, { preserveScroll: true });
        setOpen(false);
        setMobileOpen(false);
    }

    const linkClass = (isActive) =>
        `text-sm font-medium text-foreground/90 transition-colors hover:text-primary ${isActive ? 'text-primary' : ''}`;
    const mobileLinkClass = (isActive) =>
        `block py-3 text-base font-medium transition-colors ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`;

    return (
        <header className="fixed top-0 right-0 left-0 z-50 bg-cl-white">
            <nav className="container flex h-16 items-center justify-between lg:h-20">
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src="/assets/logo.webp"
                        alt="CLB KLB"
                        className="h-9 w-9 shrink-0 object-contain"
                    />
                    <span className="text-lg font-semibold text-cl-black">
                        CLB KLB
                    </span>
                </Link>

                <ul className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((item) => {
                        const { key, hasDropdown, fr, ar, nl } = item;
                        const href = item.href;
                        if (hasDropdown && item.items) {
                            const isActive = item.items.some((i) =>
                                window.location.pathname.startsWith(i.href),
                            );
                            return (
                                <li
                                    key={key}
                                    className="relative flex items-center gap-1"
                                    ref={key === 'news' ? newsRef : undefined}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setNewsDropdownOpen((v) => !v)
                                        }
                                        className={`flex items-center gap-1 text-sm font-medium text-cl-black transition hover:opacity-90 ${isActive ? 'underline underline-offset-4' : ''}`}
                                        aria-expanded={newsDropdownOpen}
                                        aria-haspopup="true"
                                    >
                                        <TransText
                                            fr={fr}
                                            ar={ar}
                                            nl={nl}
                                            as="span"
                                        />
                                        <svg
                                            className="h-4 w-4 text-cl-black"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {newsDropdownOpen && (
                                        <ul
                                            className="absolute top-full left-0 z-50 mt-1.5 min-w-48 rounded-xl bg-card py-1.5 shadow-(--shadow-card-hover) ring-1 ring-border"
                                            role="menu"
                                        >
                                            {item.items.map(
                                                ({
                                                    key: itemKey,
                                                    href: itemHref,
                                                    fr: itemFr,
                                                    ar: itemAr,
                                                    nl: itemNl,
                                                }) => (
                                                    <li
                                                        key={itemKey}
                                                        role="none"
                                                    >
                                                        <Link
                                                            href={itemHref}
                                                            role="menuitem"
                                                            className="block px-4 py-2 text-start text-sm text-foreground transition hover:bg-muted"
                                                            onClick={() =>
                                                                setNewsDropdownOpen(
                                                                    false,
                                                                )
                                                            }
                                                        >
                                                            <TransText
                                                                fr={itemFr}
                                                                ar={itemAr}
                                                                nl={itemNl}
                                                                as="span"
                                                            />
                                                        </Link>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </li>
                            );
                        }
                        const path = href === '/' ? '/' : href;
                        const isActive =
                            path !== '/'
                                ? window.location.pathname.startsWith(path)
                                : window.location.pathname === '/';
                        return (
                            <li key={key} className="flex items-center gap-1">
                                <Link
                                    href={href}
                                    className={`text-sm font-medium text-cl-black transition hover:opacity-90 ${isActive ? 'underline underline-offset-4' : ''}`}
                                >
                                    <TransText
                                        fr={fr}
                                        ar={ar}
                                        nl={nl}
                                        as="span"
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-3" ref={ref}>
                    <div className="hidden lg:flex lg:items-center lg:gap-3">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                aria-label="Langue"
                                aria-expanded={open}
                            >
                                {LOCALES.find((l) => l.code === locale)
                                    ?.label ?? 'FR'}
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {open && (
                                <ul className="absolute top-full right-0 z-50 mt-1.5 min-w-32 rounded-xl bg-card py-1.5 shadow-(--shadow-card-hover) ring-1 ring-border">
                                    {LOCALES.map((l) => (
                                        <li key={l.code}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setLocale(l.code)
                                                }
                                                className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-muted ${l.code === locale ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
                                            >
                                                {l.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <a
                            href={GOOGLE_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-alpha px-9 py-3 text-xs font-semibold text-cl-white transition hover:bg-alpha/95"
                        >
                            <TransText
                                fr="Devenez membre"
                                ar="انضم كعضو"
                                nl="Word lid"
                            />
                        </a>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition hover:bg-muted lg:hidden"
                        aria-label="Menu"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? (
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm lg:hidden">
                    <div className="mx-auto max-w-6xl px-4 py-6">
                        <ul className="space-y-0 border-t border-border pt-4">
                            {navLinks.map((item) => {
                                const { key, hasDropdown, fr, ar, nl } = item;
                                const href = item.href;
                                if (hasDropdown && item.items) {
                                    const isActive = item.items.some((i) =>
                                        window.location.pathname.startsWith(
                                            i.href,
                                        ),
                                    );
                                    return (
                                        <li
                                            key={key}
                                            className="border-b border-border"
                                        >
                                            <span
                                                className={mobileLinkClass(
                                                    isActive,
                                                )}
                                            >
                                                <TransText
                                                    fr={fr}
                                                    ar={ar}
                                                    nl={nl}
                                                    as="span"
                                                />
                                            </span>
                                            <ul className="pt-1 pb-3 pl-4">
                                                {item.items.map(
                                                    ({
                                                        key: itemKey,
                                                        href: itemHref,
                                                        fr: itemFr,
                                                        ar: itemAr,
                                                        nl: itemNl,
                                                    }) => (
                                                        <li key={itemKey}>
                                                            <Link
                                                                href={itemHref}
                                                                className="block py-2 text-sm text-muted-foreground hover:text-primary"
                                                                onClick={() =>
                                                                    setMobileOpen(
                                                                        false,
                                                                    )
                                                                }
                                                            >
                                                                <TransText
                                                                    fr={itemFr}
                                                                    ar={itemAr}
                                                                    nl={itemNl}
                                                                    as="span"
                                                                />
                                                            </Link>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </li>
                                    );
                                }
                                const path = href === '/' ? '/' : href;
                                const isActive =
                                    path !== '/'
                                        ? window.location.pathname.startsWith(
                                              path,
                                          )
                                        : window.location.pathname === '/';
                                return (
                                    <li
                                        key={key}
                                        className="border-b border-border"
                                    >
                                        <Link
                                            href={href}
                                            className={mobileLinkClass(
                                                isActive,
                                            )}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <TransText
                                                fr={fr}
                                                ar={ar}
                                                nl={nl}
                                                as="span"
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-6 flex flex-col gap-3">
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                Langue
                            </p>
                            <div className="flex gap-2">
                                {LOCALES.map((l) => (
                                    <button
                                        key={l.code}
                                        type="button"
                                        onClick={() => setLocale(l.code)}
                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${l.code === locale ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                            <a
                                href={GOOGLE_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-alpha px-12 py-4 text-center text-sm font-semibold text-cl-white transition hover:bg-alpha/95"
                            >
                                <TransText
                                    fr="Devenez membre"
                                    ar="انضم كعضو"
                                    nl="Word lid"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
