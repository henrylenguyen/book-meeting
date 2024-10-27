import { http } from './http'

const appointmentAPI = {
  getAllAppointmentThisMonth: async () => {
    try {
      const res = await http.get('/appointment-this-month')
      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }
}
export default appointmentAPI
