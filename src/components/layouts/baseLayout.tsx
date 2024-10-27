import UpcomingEvents from '@/components/layouts/calendar/upcomingEvents'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <main className='font-proxima text-light min-h-screen w-full flex gap-5 p-5 '>
      <UpcomingEvents />
      <Outlet />
    </main>
  )
}

export default BaseLayout
