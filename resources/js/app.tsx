import { createInertiaApp } from '@inertiajs/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { initializeTheme } from '@/hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob<{ default: React.ComponentType }>([
    './pages/**/*.jsx',
    './pages/**/*.tsx',
]);

/**
 * Resolve page component by name, supporting both .jsx and .tsx.
 * Inertia sends names like "auth/login"; we try ./pages/auth/login.tsx then ./pages/auth/login.jsx.
 */
function resolvePage(name: string) {
    const pathTsx = `./pages/${name}.tsx`;
    const pathJsx = `./pages/${name}.jsx`;
    const key = pathTsx in pages ? pathTsx : pathJsx in pages ? pathJsx : null;
    if (!key) {
        throw new Error(`Page not found: ${name}`);
    }
    return pages[key]().then((mod) => mod.default);
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: resolvePage,
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
