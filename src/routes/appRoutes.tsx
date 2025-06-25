import useSession from '@/hooks/useSession'
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
  console.log(user)

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
        <Route path='/' index element={<HomePage />} />
      </Route>

      {/* ** NOT FOUND ROUTES ** */}
      <Route path='*' element={<NotFound />} />
    </>
  )
)

export default function AppRoutes () {
  return <RouterProvider router={router} />
}
