// src/routes/_layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Banner } from '@/components/common/Banner/index';
import Bar from '@/components/template/Bar';
import Footer from '@/components/template/Footer';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createFileRoute('/_layout')({
    component: LayoutComponent,
});

export function LayoutComponent() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Bar />
            {/* Outlet renderizará as páginas filhas */}
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <TanStackRouterDevtools />
        </div>
    );
}