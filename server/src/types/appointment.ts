// Interface để mô tả dữ liệu của cuộc hẹn
export interface IAppointment {
  id: string
  title: string
  attendees: { id: number; name: string; email: string }[]
  eventTime: {
    startDate: string
    startTime: string
    endDate: string
    endTime: string
  }
  recurrence: {
    repeatUnit: string
  }
  location: string
  timezone: string
  color: string
  description: string
  url: string
  type: string
  category: string
  share_url: string
}