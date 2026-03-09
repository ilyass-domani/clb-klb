import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SetDocumentDirection from '@/components/SetDocumentDirection';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function AppLayout({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) {
    const { auth } = usePage().props as { auth?: { user?: { role?: string } } };
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <SetDocumentDirection />
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <Footer />}
        </AppLayoutTemplate>
    );
}
