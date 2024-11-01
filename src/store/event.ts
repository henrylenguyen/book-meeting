/* eslint-disable @typescript-eslint/no-explicit-any */
import eventAPI from '@/api/eventAPI'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useEventStore = create(
  devtools(
    persist(
      (set) => ({
        events: [],
        loading: false,
        onlineEvents: [],
        fetchAllOnlineEvents: async () => {
          set({ loading: true })
          try {
            const response = await eventAPI.getAllOnlineEvents()
            set(() => ({ onlineEvents: response.data, loading: false }))
          } catch (error) {
            set({ loading: false })
            console.error('Error fetching events:', error)
          }
        },
        fetchAllEvents: async () => {
          set({ loading: true })
          try {
            const response = await eventAPI.getAllEvents()
            set(() => ({ events: response.data, loading: false }))
          } catch (error) {
            set({ loading: false })
            console.error('Error fetching events:', error)
          }
        },
        createNewEvent: async (eventData: Record<string, unknown>) => {
          set({ loading: true })
          try {
            const response = await eventAPI.createNewEvent(eventData)
            if (response?.status === 201) {
              set((state: any) => ({
                events: [...state.events, response?.data.data],
                loading: false,
                success: true
              }))

              toast.success('Event created successfully')
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
        name: 'event-store'
      }
    )
  )
)

export default useEventStore
