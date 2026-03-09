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
    const page = usePage();
    const url = page.url as string;
    const isAdminRoute = url.startsWith('/admin');

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <SetDocumentDirection />
            {!isAdminRoute && <Navbar />}
            {children}
            {!isAdminRoute && <Footer />}
        </AppLayoutTemplate>
    );
}
