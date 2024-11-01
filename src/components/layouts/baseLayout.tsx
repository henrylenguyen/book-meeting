import UpcomingEvents from '@/components/layouts/calendar/upcomingEvents'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BaseLayout = () => {
  return (
    <main className='font-proxima text-light min-h-screen w-full flex gap-5 p-5 '>
      <UpcomingEvents />
      <Outlet />
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  )
}

export default BaseLayout
