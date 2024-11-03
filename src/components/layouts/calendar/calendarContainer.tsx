import CalendarHeader from '@/components/layouts/calendar/calendarHeader'
import EventDialog from '@/components/ui/createEventDialog'
import EditableEventDialog from '@/components/ui/editEventDialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/context/languageContext'
import { useFetchAppointmentsAndEvents } from '@/hooks/useAppointmentEvent'
import { calendarEvents } from '@/lib/eventCalendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { format, isBefore, subDays } from 'date-fns'
import React, { useRef } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

// Lazy load component

// eslint-disable-next-line prettier/prettier
interface ICalenadarContainerProps { }

const CalenadarContainer: React.FunctionComponent<ICalenadarContainerProps> = () => {
  const calendarRef = useRef<FullCalendar>(null)
  const { language } = useLanguage()
  const [selectedDateRange, setSelectedDateRange] = React.useState<{ start: string; end: string } | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState<{
    isOpen: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  }>({
    isOpen: false,
    data: null
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dataAppointment, dataEvents, isLoading } = useFetchAppointmentsAndEvents()

  return isLoading ? (
    <Skeleton className='w-screen h-screen' />
  ) : (
    <div className='flex flex-col gap-5 flex-1'>
      <CalendarHeader calendarRef={calendarRef} />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={false}
        events={calendarEvents(dataAppointment, dataEvents)}
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
          setCreateDialogOpen(true)
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
        eventDidMount={(info) => {
          // Add attributes required by react-tooltip
          info.el.setAttribute('data-tooltip-id', 'event-tooltip')
          const location = info.event.extendedProps.location
            ? `Location: ${info.event.extendedProps.location}<br/>`
            : ''
          const description = info.event.extendedProps.description
            ? `Description: ${info.event.extendedProps.description}`
            : ''
          const attendees = info.event.extendedProps.attendees ? `Attendees: ${info.event.extendedProps.attendees}` : ''
          info.el.setAttribute(
            'data-tooltip-html',
            `
              <div class='flex flex-col gap-2'>
              <h1>Title: ${info.event.title}</h1>
              <span>
              ${location}
              </span>
              <div>
              ${description}
              </div>
              <span>${attendees}</span>
              </div>
            `
          )
        }}
        nowIndicator={true}
        dayMaxEventRows={2} // Limits the number of rows displayed on a single day cell
        dayMaxEvents={3} // Limits the number of events displayed on a single day cell
        eventClick={(info) => {
          console.log('info:', info)
          info.jsEvent.preventDefault()
          info.jsEvent.stopPropagation()
          const eventData = [...dataAppointment, ...dataEvents].find((event) => event.id === info.event.id)
          console.log('eventData:', eventData)
          setEditDialogOpen({
            isOpen: true,
            data: eventData
          })
        }}
      />
      {createDialogOpen && (
        <EventDialog
          selectedDateRange={selectedDateRange}
          isDialogOpen={createDialogOpen}
          setIsDialogOpen={setCreateDialogOpen}
        />
      )}
      {editDialogOpen && (
        <EditableEventDialog
          isDialogOpen={editDialogOpen.isOpen}
          setIsDialogOpen={() => setEditDialogOpen({ isOpen: !editDialogOpen.isOpen, data: null })}
          eventData={editDialogOpen.data}
        />
      )}
      <ReactTooltip id='event-tooltip' place='top' />
    </div>
  )
}

export default CalenadarContainer
