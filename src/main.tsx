import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

import useAuthStore from './store/auth.ts'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.ts'

import { Page } from './pages/index.tsx'
import { ContactPage } from './pages/contact.tsx'
import { OrdersPage } from './pages/orders.tsx'
import { ProductPage } from './pages/products.tsx'
import { AboutPage } from './pages/about.tsx'
import { ProfilePage } from './pages/profile.tsx'
import { RegisterPage } from './pages/register.tsx'
import { LoginPage } from './pages/login.tsx'
import App from './App.tsx'

import Footer from './components/template/Footer/index.tsx'

import { Banner } from './components/common/Banner/index.tsx'
import Bar from './components/template/Bar/index.tsx'

function RootComponent() {
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <> 
      <RouterProvider 
        router={router}
          context={{
          auth: { isAuthenticated, user },
        }}
      ></RouterProvider>
    </>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Banner />
      <Bar />
      <Outlet />
      <Footer />
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



const privateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  }
});

const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
})



const ContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute, 
  AboutRoute, 
  ContactRoute, 
  MenuRoute, 
  OrdersRoute, 
  privateRoute, 
  HomeRoute, 
  LoginRoute, 
  RegisterRoute
])

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, 
  },
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
      <QueryClientProvider client={queryClient}>
        <RootComponent/>
      </QueryClientProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
