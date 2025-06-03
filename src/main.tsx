import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

import { Page } from './pages/index.tsx'
import { ContactPage } from './pages/contact.tsx'
import { OrdersPage } from './pages/orders.tsx'
import { ProductPage } from './pages/products.tsx'
import { AboutPage } from './pages/about.tsx'
import { ProfilePage } from './pages/profile.tsx'
import App from './App.tsx'

import Footer from './components/template/Footer/index.tsx'
import Bar from './components/template/Bar/index.tsx'
import { Banner } from './components/common/Banner/index.tsx'
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: Page,
})


const AboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

const MenuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductPage,
})

const OrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: OrdersPage,
})


const ProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
})



const ContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
})

const routeTree = rootRoute.addChildren([indexRoute, AboutRoute, ContactRoute, MenuRoute, OrdersRoute, ProfileRoute, HomeRoute])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Banner />
      <Bar />
      <RouterProvider router={router} />
      <Footer />
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
