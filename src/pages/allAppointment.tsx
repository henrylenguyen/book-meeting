import { useLanguage } from '@/context/languageContext'
import { useFetchAppointmentsAndEvents } from '@/hooks/useAppointmentEvent'
import { calendarEvents } from '@/lib/eventCalendar'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import * as React from 'react'

interface IAllAppointmentPageProps { }

const AllAppointmentPage: React.FunctionComponent<IAllAppointmentPageProps> = React.memo(() => {
  const { language } = useLanguage()
  const { dataAppointment, dataEvents } = useFetchAppointmentsAndEvents()
  return (
    <div className='flex-1'>
      <FullCalendar
        plugins={[listPlugin]}
        initialView='listMonth'
        headerToolbar={false}
        height='95vh'
        events={calendarEvents(dataAppointment, dataEvents)}
        dayHeaderContent={(arg) => {
          const dayOfWeek =
            language === 'vi'
              ? arg.date.toLocaleDateString('vi-VN', { weekday: 'short' })
              : arg.date.toLocaleDateString('en-US', { weekday: 'short' })
          return <span className='header-content text-gray-500'>{dayOfWeek}</span>
        }}
        allDayText={language === 'vi' ? 'Cả ngày' : 'All day'}
        locale={language}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        slotLabelClassNames='w-[100px] flex items-center justify-center text-gray-500 slotLabel'
        noEventsText={language === 'vi' ? 'Không có sự kiện nào' : 'No events'}
      />
    </div>
  )
})

export default AllAppointmentPage
