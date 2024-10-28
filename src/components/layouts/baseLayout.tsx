import UpcomingEvents from '@/components/layouts/calendar/upcomingEvents'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <main className='font-proxima text-light min-h-screen w-full flex gap-5 p-5 '>
      <UpcomingEvents />
      <Outlet />
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              border: '0px solid #ffffff',
              color: '#ffffff',
              background: 'linear-gradient(270deg, #5495FC 0%, #31D366 100%)'
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#60EC8E'
            }
          }
        }}
      />
    </main>
  )
}

export default BaseLayout
