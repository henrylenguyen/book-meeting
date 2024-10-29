/* eslint-disable @typescript-eslint/no-explicit-any */
export const removeUndefinedFields = (obj: any) => {
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined))
}
export const mapEventData = (event: any) => ({
  id: event.id,
  title: event.name,
  attendees: event.attendees?.length ? event.attendees : [],
  eventTime: {
    startDate: event.start_date,
    startTime: event.start_time,
    endDate: event.end_date,
    endTime: event.end_time
  },
  recurrence: event.recurrence,
  location: event.status,
  timezone: event.timezone,
  color: event.color,
  description: event.summary,
  url: event.url,
  type: event._type,
  category: event.category,
  share_url: event.share_url || '',
  tickets_by: event.tickets_by
})
