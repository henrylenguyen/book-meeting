import { http } from './http'

const appointmentAPI = {
  getAllAppointmentThisMonth: async () => {
    try {
      const res = await http.get('/appointments')
      if (res.status === 200) {
        return res
      }
    } catch (error) {
      throw new Error(error as string)
    }
  },
  createAppointment: async (appointmentData: Record<string, unknown>) => {
    try {
      const res = await http.post('/appointments/create', appointmentData)
      if (res.status === 201) {
        return res
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }
}
export default appointmentAPI
