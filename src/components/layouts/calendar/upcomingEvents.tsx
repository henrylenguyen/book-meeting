import { emptyBox } from '@/assets/images'
import EventItems from '@/components/layouts/calendar/eventItem'
import { typeAppointment } from '@/constants/appointment'
import useAppointmentStore from '@/store/appointment'
import { AppointmentResponse, IAppointmentStore } from '@/types/appointmentType'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

interface UpcomingEventsProps { }
const UpcomingEvents: React.FC<UpcomingEventsProps> = () => {
  const { fetchAllAppointmentThisMonth, appointments } = useAppointmentStore((state) => state as IAppointmentStore)

  const location = useLocation().pathname.split('/')[2]
  const { t } = useTranslation()
  useEffect(() => {
    fetchAllAppointmentThisMonth()
  }, [])

  const upcomingEvents = useMemo(() => {
    if (location === 'all-appointment') {
      return appointments.filter((event) => {
        const eventDate = new Date(event.date)
        const diffInDays = (eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        return diffInDays >= 0 && diffInDays <= 7
      })
    } else {
      return appointments
        .filter((event) => {
          const eventDate = new Date(event.date)
          const diffInDays = (eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          return diffInDays >= 0 && diffInDays <= 7
        })
        .slice(0, 4)
    }
  }, [appointments, location])

  const renderTime = (event: AppointmentResponse) => {
    if (event.type === typeAppointment.recurring && event.recurrence) {
      return `${event.recurrence.start_time} - ${event.recurrence.end_time}`
    } else {
      return `${event.start_time} - ${event.end_time}`
    }
  }
  return (
    <div className='pr-4 bg-white border-r w-[400px]'>
      <div className='flex justify-between items-center sticky'>
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
      <div className='mt-4 space-y-4  max-h-[85vh] hover:overflow-y-auto overflow-hidden'>
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
