import { useFetchData, useFetchMultipleData } from '@/hooks/useCRUDQuery'
import { IDataResponse } from '@/types/dataResponse'

export function useFetchAppointmentsAndEvents() {
  const results = useFetchMultipleData<IDataResponse>([
    { queryKey: ['appointments'], url: '/appointments' },
    { queryKey: ['events'], url: '/events' }
  ])

  const dataAppointment = results[0]?.data?.data || []
  const dataEvents = results[1]?.data?.data || []
  const isLoading = results.some((result) => result.isLoading)

  return { dataAppointment, dataEvents, isLoading }
}

export function useFetchOnlineEvents() {
  const { data } = useFetchData<IDataResponse>({
    queryKey: ['onlineEvents'],
    url: '/events/online'
  })

  const onlineEvents = data?.data || []
  return { data: onlineEvents }
}
