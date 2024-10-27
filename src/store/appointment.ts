import appointmentAPI from '@/api/appointmentAPI'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useAppointmentStore = create(
  devtools(
    persist(
      (set) => ({
        appointments: [],
        loading: false,

        fetchAllAppointmentThisMonth: async () => {
          set({ loading: true })
          try {
            const response = await appointmentAPI.getAllAppointmentThisMonth()
            set(() => ({ appointments: response.data, loading: false }))
          } catch (error) {
            set({ loading: false })
            console.error('Error fetching todos:', error)
          }
        }
      }),
      {
        name: 'appointment-store'
      }
    )
  )
)

export default useAppointmentStore
