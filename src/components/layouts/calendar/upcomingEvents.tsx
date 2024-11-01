import { emptyBox } from '@/assets/images'
import EventItems from '@/components/layouts/calendar/eventItem'
import { Skeleton } from '@/components/ui/skeleton'
import { typeAppointment } from '@/constants/appointment'
import { useLanguage } from '@/context/languageContext'
import { useFetchAppointmentsAndEvents } from '@/hooks/useAppointmentEvent'
import { AppointmentResponse } from '@/types/appointmentType'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

// eslint-disable-next-line prettier/prettier
interface UpcomingEventsProps { }
const UpcomingEvents: React.FC<UpcomingEventsProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dataAppointment, dataEvents, isLoading } = useFetchAppointmentsAndEvents()
  const { language } = useLanguage()
  const location = useLocation().pathname.split('/')[2]
  const { t } = useTranslation()

  const upcomingEvents = useMemo(() => {
    if (dataAppointment && dataEvents) {
      return [...dataAppointment, ...dataEvents]
        .filter((event) => {
          const now = new Date()
          const oneWeekLater = new Date()
          oneWeekLater.setDate(now.getDate() + 7)

          const startDate = new Date(event.eventTime?.startDate)
          const endDate = new Date(event.eventTime?.endDate)

          // Kiểm tra nếu startDate hoặc endDate nằm trong khoảng từ hôm nay đến 1 tuần nữa
          return (startDate >= now && startDate <= oneWeekLater) || (endDate >= now && endDate <= oneWeekLater)
        })
        .sort((a, b) => new Date(a.eventTime?.startDate).getTime() - new Date(b.eventTime?.startDate).getTime())
    }
    return []
  }, [dataAppointment, dataEvents])

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

  return isLoading ? (
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
        {upcomingEvents?.length > 0 ? (
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
