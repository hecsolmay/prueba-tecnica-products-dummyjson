import useSession from '@/hooks/useSession'
import AppLayout from '@/layouts/appLayout'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import NotFound from '@/pages/not-found'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider
} from 'react-router'

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useSession()

  if (user === null) {
    console.error('Usuario no autenticado, redirigiendo al login...')
    return <Navigate to='/login' replace />
  }

  // eslint-disable-next-line no-unneeded-ternary
  return children ? children : <Outlet />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ** PUBLIC ROUTES ** */}

      <Route path='/login' element={<LoginPage />} />
      {/* ** PROTECTED ROUTES ** */}

      <Route element={<ProtectedRoute />}>
        {/* App Layout */}
        <Route element={<AppLayout />}>
          <Route path='/' index element={<HomePage />} />
        </Route>
      </Route>

      {/* ** NOT FOUND ROUTES ** */}
      <Route path='*' element={<NotFound />} />
    </>
  )
)

export default function AppRoutes () {
  return <RouterProvider router={router} />
}
