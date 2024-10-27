import eventAPI from '@/api/eventAPI'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useEventStore = create(
  devtools(
    persist(
      (set) => ({
        appointments: [],
        loading: false,

        fetchAllOnlineEvents: async () => {
          set({ loading: true })
          try {
            const response = (await eventAPI.getAllOnlineEvents()) as {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              events: any[]
            }
            set(() => ({ appointments: response.events, loading: false }))
          } catch (error) {
            set({ loading: false })
            console.error('Error fetching events:', error)
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
