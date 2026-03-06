import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SetDocumentDirection from '@/components/SetDocumentDirection';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const isAdmin = window.location.pathname.startsWith('/admin');

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <SetDocumentDirection />
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <Footer />}
        </AppLayoutTemplate>
    );
}
