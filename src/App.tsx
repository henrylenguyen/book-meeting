import BaseLayout from '@/components/layouts/baseLayout'
import AllAppointmentPage from '@/pages/allAppointment'
import HomePage from '@/pages/homepage'
import { useRoutes } from 'react-router-dom'
import './i18n'

function App() {
  const routes = useRoutes([
    {
      path: '/:lang',
      element: <BaseLayout />,
      children: [
        {
          path: '',
          element: <HomePage />
        },
        {
          path: 'all-appointment',
          element: <AllAppointmentPage />
        }
      ]
    }
  ])

  return routes
}

export default App
