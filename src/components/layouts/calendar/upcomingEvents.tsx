import { emptyBox } from '@/assets/images'
import EventItems from '@/components/layouts/calendar/eventItem'
import { Skeleton } from '@/components/ui/skeleton'
import { typeAppointment } from '@/constants/appointment'
import { useLanguage } from '@/context/languageContext'
import useAppointmentStore from '@/store/appointment'
import useEventStore from '@/store/event'
import { AppointmentResponse, IAppointmentStore } from '@/types/appointmentType'
import { IEventStore } from '@/types/eventType'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

// eslint-disable-next-line prettier/prettier
interface UpcomingEventsProps { }
const UpcomingEvents: React.FC<UpcomingEventsProps> = () => {
  const { appointments } = useAppointmentStore((state) => state as IAppointmentStore)
  const { events } = useEventStore((state) => state as IEventStore)
  const { language } = useLanguage()
  const location = useLocation().pathname.split('/')[2]
  const { t } = useTranslation()
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    if (appointments.length > 0 || events.length > 0) {
      setLoading(false)
    }
  }, [appointments.length, events.length])

  const upcomingEvents = useMemo(() => {
    return [...appointments, ...events]
      .filter((event) => {
        const eventStartDate = new Date(event.eventTime.startDate)
        const diffInDays = (eventStartDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        return diffInDays >= 0 && diffInDays <= 14
      })
      .slice(0, location === 'all-appointment' ? undefined : 4)
  }, [appointments, events, location])

  const renderTime = (event: AppointmentResponse) => {
    const formatDate = (date: string) => {
      const [year, month, day] = date.split('-')
      return language === 'vi' ? `${day}/${month}/${year}` : `${month}/${day}/${year}`
    }

    if (event.eventTime) {
      const formattedStartDate = formatDate(event.eventTime.startDate)
      const formattedEndDate = formatDate(event.eventTime.endDate)

      if (event.type === typeAppointment.recurring) {
        return `${formattedStartDate} ${event.eventTime.startTime} - ${formattedEndDate} ${event.eventTime.endTime}`
      }
      return `${formattedStartDate} ${event.eventTime.startTime} - ${formattedEndDate} ${event.eventTime.endTime}`
    }

    return 'N/A'
  }

  return loading ? (
    <Skeleton className='w-[400px] h-screen flex-1' />
  ) : (
    <div className='pr-4 bg-white border-r w-[400px] flex-shink'>
      <div className='flex justify-between items-center'>
        <h2 className='text-[25px] font-bold text-blue-dark capitalize'>{t('up-coming-events')}</h2>
        {location === 'all-appointment' ? (
          <NavLink className='text-white bg-blue-dark px-3 py-2 rounded-2xl text-[13px] capitalize' to='/'>
            {t('back')}
          </NavLink>
        ) : (
          <NavLink
            className='text-white bg-blue-dark px-3 py-2 rounded-2xl text-[13px] capitalize'
            to='all-appointment'
          >
            {t('view-all')}
          </NavLink>
        )}
      </div>
      <div className='mt-4 space-y-4 max-h-[85vh] hover:overflow-y-auto overflow-hidden'>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventItems
              key={event.id}
              title={event.title}
              time={renderTime(event)}
              url={event.url}
              isAppointment={event.category === 'appointment'}
              color={event.color || ''}
            />
          ))
        ) : (
          <div className='flex flex-col gap-5 h-full items-center justify-center w-full'>
            <img src={emptyBox} alt='no events' className='size-[200px]' />
            <p>{t('no-up-coming-events')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpcomingEvents
