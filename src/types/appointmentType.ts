export interface AppointmentResponse {
  id: number
  type: string
  category: string
  title: string
  recurrence?: Recurrence
  description: string
  url: string
  share_url: string
  location: string
  timezone: string
  color: string
  status: string
  date: string
  start_time?: string
  end_time?: string
}
interface Recurrence {
  type: string
  days_of_week: number[]
  start_time: string
  end_time: string
}

export interface IAppointmentStore {
  appointments: AppointmentResponse[]
  loading: boolean
  fetchAllAppointmentThisMonth: () => Promise<void>
}
