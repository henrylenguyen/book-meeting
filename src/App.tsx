import BaseLayout from '@/components/layouts/baseLayout'
import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import './i18n'

const HomePage = lazy(() => import('@/pages/homepage'))
const AllAppointmentPage = lazy(() => import('@/pages/allAppointment'))

function App() {
  const routes = useRoutes([
    {
      path: '/:lang',
      element: <BaseLayout />,
      children: [
        {
          path: '',
          element: (
            <Suspense fallback={<>.</>}>
              <HomePage />
            </Suspense>
          )
        },
        {
          path: 'all-appointment',
          element: (
            <Suspense fallback={<></>}>
              <AllAppointmentPage />
            </Suspense>
          )
        }
      ]
    }
  ])

  return routes
}

export default App
