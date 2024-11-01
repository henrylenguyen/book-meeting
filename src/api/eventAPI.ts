import { http } from './http'

const eventAPI = {
  getAllOnlineEvents: async () => {
    try {
      const res = await http.get('/events')
      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      throw new Error(error as string)
    }
  },
  createNewEvent: async (eventData: Record<string, unknown>) => {
    try {
      const res = await http.post('/events/create', eventData)
      if (res.status === 201) {
        return res
      }
    } catch (error) {
      throw new Error(error as string)
    }
  },
  getAllEvents: async () => {
    try {
      const res = await http.get('/events')
      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }
}

export default eventAPI
