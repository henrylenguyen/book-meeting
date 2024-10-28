export interface EventResponse {
  id: string
  type: string
  category: string
  title: string
  recurrence: Recurrence
  eventTime: EventTime
  description: string
  url: string
  share_url: string
  location: string
  timezone: string
  color: string
  status: string
  attendees: Attendee[]
  tickets_by: string
}

export interface Recurrence {
  repeatUnit: string
}

export interface EventTime {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export interface Attendee {
  id: number
  name: string
  email: string
}

export interface IEventStore {
  events: EventResponse[]
  onlineEvents: EventResponse[]
  loading: boolean
  fetchAllOnlineEvents: () => Promise<void>
  success: boolean
}
