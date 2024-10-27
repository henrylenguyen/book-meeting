// Thêm nếu cần sử dụng ref API FullCalendar
import CalendarHeader from '@/components/layouts/calendar/calendarHeader'
import EventDialog from '@/components/ui/eventDialog'
import { useLanguage } from '@/context/languageContext'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { format, isBefore, subDays } from 'date-fns'
import React, { useRef } from 'react'

interface ICalenadarContainerProps { }

const CalenadarContainer: React.FunctionComponent<ICalenadarContainerProps> = () => {
  const calendarRef = useRef<FullCalendar>(null)
  const { language } = useLanguage()
  const [selectedDateRange, setSelectedDateRange] = React.useState<{ start: string; end: string } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <div className='flex flex-col gap-5 flex-1'>
      <CalendarHeader calendarRef={calendarRef} />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin, interactionPlugin]}
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
        selectable={true}
        select={(info) => {
          const adjustedEndStr = format(subDays(new Date(info.endStr), 1), 'yyyy-MM-dd')

          setSelectedDateRange({
            start: info.startStr,
            end: adjustedEndStr
          })
          setIsDialogOpen(true)
        }}
        selectAllow={(selectInfo) => {
          const today = new Date()
          return !isBefore(selectInfo.start, today)
        }}
        dayCellDidMount={(info) => {
          const today = new Date()
          if (isBefore(info.date, today)) {
            info.el.classList.add('fc-day-past')
          }
        }}
      />
      <EventDialog
        selectedDateRange={selectedDateRange}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  )
}

export default CalenadarContainer
