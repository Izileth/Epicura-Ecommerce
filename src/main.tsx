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

import useAuthStore from './store/auth.ts'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.ts'

import { RebootPage } from './pages/reboot.tsx'

import ContactPage from './pages/contact.tsx'
import OrdersPage from './pages/orders.tsx'

import { ProductPublicPage } from './pages/product/product.public.list.tsx'
import { ProductUserPage } from './pages/product/product.user.dt.tsx'
import { ProductUpdatePage } from './pages/product/product.update.tsx'
import { ProductCreatePage } from './pages/product/product.create.tsx'
import { ProductDetailsPage } from './pages/product/product.id.tsx'
import { ProductCategoryPage } from './pages/category/categories.tsx'

import { AboutPage } from './pages/about.tsx'
import { ProfilePage } from './pages/profile.tsx'

import { RegisterPage } from './pages/auth/register.tsx'
import { LoginPage } from './pages/auth/login.tsx'

import { FogotPasswordPage } from './pages/auth/password/forgot.tsx'
import { SettingsPasswordPage } from './pages/auth/password/edit.tsx'
import { ResetPasswordPage } from './pages/auth/password/reset.tsx'

import { CartListPage } from './pages/cart/cart.list.tsx'

import App from './App.tsx'

import Footer from './components/template/Footer/index.tsx'

import { Banner } from './components/common/Banner/index.tsx'
import Bar from './components/template/Bar/index.tsx'

import { TokenRefreshProvider } from './components/common/refresh/refreshTokenProvider.tsx'

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
        <TokenRefreshProvider refreshIntervalMinutes={15}>
          <Bar />
          <Outlet />
          <Footer />
        </TokenRefreshProvider>
      <TanStackRouterDevtools />
    </>
  ),
})


const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})


const RebootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: RebootPage,
})

const AboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
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


const ForgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: FogotPasswordPage,
})


const SettingsPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPasswordPage,
})

const ResetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  component: ResetPasswordPage,
})

const ContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
})

const ProductPublicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductPublicPage,
})

const ProductUserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/user',
  component: ProductUserPage,
});

const ProductEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/edit/$id',
  component: ProductUpdatePage,
});

const ProductCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/create',
  component: ProductCreatePage,
});

export const ProductDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$id',
  component: ProductDetailsPage,
})


export const CategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories/$id',
  component: ProductCategoryPage,
})

export const CartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartListPage,
})


const routeTree = rootRoute.addChildren([
  indexRoute, 
  RebootRoute,
  AboutRoute, 
  ContactRoute, 
  ProductPublicRoute, 
  OrdersRoute, 
  privateRoute,  
  LoginRoute, 
  RegisterRoute,
  ForgotPasswordRoute,
  SettingsPasswordRoute,
  ResetPasswordRoute,
  ProductEditRoute,
  ProductCreateRoute,
  ProductUserRoute,
  ProductDetailRoute,
  CategoryRoute,
  CartRoute
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
  // Adicione estas configurações para melhor handling de rotas
  notFoundMode: 'root', // Renderiza o componente de root quando rota não encontrada
  // ou você pode criar um componente de 404 customizado:
  // defaultNotFoundComponent: () => <div>Página não encontrada</div>
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

