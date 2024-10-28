/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDateTimeToIOS } from '@/lib/utils'
import { addDays } from 'date-fns'

// Extract appointments and events, and transform for FullCalendar

export const calendarEvents = (appointments: any, events: any) => {
  return [...appointments, ...events].map((item) => {
    const timezoneOffset = item.timezone.match(/UTC ([+-]\d+)/)?.[1] ?? '+00:00'

    const start = formatDateTimeToIOS(item.eventTime.startDate, item.eventTime.startTime, timezoneOffset) ?? ''
    const end = formatDateTimeToIOS(item.eventTime.endDate, item.eventTime.endTime, timezoneOffset) ?? ''

    const startDate = new Date(start)
    const endDate = new Date(end)

    return {
      title: item.title,
      start: addDays(startDate, -1).toISOString(),
      end: addDays(endDate, -1).toISOString(),
      extendedProps: {
        description: item.description,
        location: item.location,
        attendees: item?.attendees?.map((attendee: any) => attendee.name).join(', ')
      }
    }
  })
}
