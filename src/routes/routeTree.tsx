// src/routes/routeTree.ts
import { createRoute } from '@tanstack/react-router';
import { LayoutComponent } from './_layout';
import App from '@/App';
import { Page } from '@/pages/index';
import { AboutPage } from '@/pages/about';
// Importe todas as páginas...


// Rotas filhas do layout
export const routeTree = LayoutRo.addChildren([
  createRoute({
    path: '/',
    component: App,
  }),
  createRoute({
    path: '/home',
    component: Page,
  }),
  createRoute({
    path: '/about',
    component: AboutPage,
  }),
  // Adicione todas as outras rotas aqui...
]);