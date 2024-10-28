import appointmentAPI from '@/api/appointmentAPI'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useAppointmentStore = create(
  devtools(
    persist(
      (set) => ({
        appointments: [],
        loading: false,
        success: false,

        fetchAllAppointmentThisMonth: async () => {
          set({ loading: true })
          try {
            const response = await appointmentAPI.getAllAppointmentThisMonth()
            set(() => ({ appointments: response?.data.data, loading: false, success: true }))
          } catch (error) {
            set({ loading: false })
            console.error('Error fetching todos:', error)
          } finally {
            set({ loading: false, success: false })
          }
        },
        createNewAppointment: async (appointmentData: Record<string, unknown>) => {
          set({ loading: true })
          try {
            const response = await appointmentAPI.createAppointment(appointmentData)
            if (response?.status === 201) {
              set((state) => ({
                appointments: [...state.appointments, response?.data.data],
                loading: false,
                success: true
              }))

              toast.success('Appointment created successfully')

            }
          } catch (error) {
            set({ loading: false })
            console.error('Error creating new appointment:', error)
          } finally {
            set({ loading: false, success: false })
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
