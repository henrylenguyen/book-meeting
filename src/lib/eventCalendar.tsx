/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDateTimeToISO } from '@/lib/utils'

// Extract appointments and events, and transform for FullCalendar

export const calendarEvents = (appointments: any[], events: any[]) => {
  return [...appointments, ...events].map((item) => {
    const { eventTime, title, description, location, attendees } = item

    const start = formatDateTimeToISO(eventTime.startDate, eventTime.startTime) ?? ''
    const end = formatDateTimeToISO(eventTime.endDate, eventTime.endTime) ?? ''

    return {
      title,
      start,
      end,
      id: item.id,
      extendedProps: {
        description,
        location,
        attendees: attendees?.map((attendee: any) => attendee.name).join(', ') || ''
      }
    }
  })
}
