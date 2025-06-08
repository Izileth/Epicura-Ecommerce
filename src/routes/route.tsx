import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree';

export const router = createRouter({
    routeTree,
    context: {
        auth: undefined!, // Será preenchido pelo RouterProvider
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        route: typeof router;
    }
}