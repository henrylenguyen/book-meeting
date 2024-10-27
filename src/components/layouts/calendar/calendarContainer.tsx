// Thêm nếu cần sử dụng ref API FullCalendar
import CalendarHeader from '@/components/layouts/calendar/calendarHeader'
import EventDialog from '@/components/ui/eventDialog'
import { useLanguage } from '@/context/languageContext'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import React, { useRef } from 'react'

interface ICalenadarContainerProps { }

const CalenadarContainer: React.FunctionComponent<ICalenadarContainerProps> = () => {
  const calendarRef = useRef<FullCalendar>(null)
  const { language } = useLanguage()
  return (
    <div className='flex flex-col gap-5 flex-1'>
      <CalendarHeader calendarRef={calendarRef} />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
        initialView='dayGridMonth'
        headerToolbar={false}
        events={[
          { title: 'Event 1', date: '2024-10-23' },
          { title: 'Event 2', date: '2024-10-24' }
        ]}
        height='auto'
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
      <EventDialog/>
    </div>
  )
}

export default CalenadarContainer
