import CalenadarContainer from '@/components/layouts/calendar/calendarContainer'
import { Skeleton } from '@/components/ui/skeleton'
import useAppointmentStore from '@/store/appointment'
import useEventStore from '@/store/event'
import { IAppointmentStore } from '@/types/appointmentType'
import { IEventStore } from '@/types/eventType'
import React, { useEffect } from 'react'

interface IHomePageProps { }

const HomePage: React.FunctionComponent<IHomePageProps> = React.memo(() => {
  const { fetchAllAppointmentThisMonth } = useAppointmentStore((state) => state as IAppointmentStore)
  const { fetchAllOnlineEvents } = useEventStore((state) => state as IEventStore)
  const [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    Promise.all([fetchAllAppointmentThisMonth(), fetchAllOnlineEvents()])
      .then(() => {
        console.log('All data fetched successfully')
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])
  return loading ? <Skeleton className='w-screen h-screen' /> : <CalenadarContainer />
})

export default HomePage
