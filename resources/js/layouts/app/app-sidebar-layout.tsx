import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const isAdmin = window.location.pathname.startsWith('/admin');

    return (
        <AppShell variant="sidebar">
            {isAdmin && <AppSidebar />}
            <AppContent variant="sidebar" className="overflow-x-hidden">
                {isAdmin && <AppSidebarHeader breadcrumbs={breadcrumbs} />}
                {children}
            </AppContent>
        </AppShell>
    );
}
