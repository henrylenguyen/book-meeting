import { http } from '@/api/http'
import { showToast } from '@/lib/toastUtil'
import { QueryKey, useMutation, useQueries, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

type FetchDataParams<T> = {
  queryKey: QueryKey
  url: string
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
}

export function useFetchData<T>({ queryKey, url, options }: FetchDataParams<T>) {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const res = await http.get<T>(url)
      return res.data
    },
    ...options
  })
}

export function useFetchMultipleData<T>(queries: FetchDataParams<T>[]) {
  const results = useQueries({
    queries: queries.map(({ queryKey, url, options }) => ({
      queryKey,
      queryFn: async () => {
        const res = await http.get<T>(url)
        return res.data
      },
      ...options
    }))
  })

  return results
}
type CrudOptions = {
  onSuccessMessage?: string
  onErrorMessage?: string
}

export const useCreateData = <T>(
  url: string,
  { onSuccessMessage, onErrorMessage }: CrudOptions = {},
  queryKey?: QueryKey
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: T) => {
      const res = await http.post(url, data)
      return res.data
    },
    onSuccess: () => {
      showToast(onSuccessMessage ?? 'Data created successfully!', 'success')
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey })
      } else {
        queryClient.invalidateQueries()
      }
    },
    onError: () => {
      showToast(onErrorMessage ?? 'Failed to create data.', 'error')
    }
  })
}

export const useUpdateData = <T>(
  url: string,
  { onSuccessMessage, onErrorMessage }: CrudOptions = {},
  queryKey?: QueryKey
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: T) => {
      const res = await http.put(url, data)
      return res.data
    },
    onSuccess: () => {
      showToast(onSuccessMessage ?? 'Data updated successfully!', 'success')
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey })
      } else {
        queryClient.invalidateQueries()
      }
    },
    onError: () => {
      showToast(onErrorMessage ?? 'Failed to update data.', 'error')
    }
  })
}

export const useDeleteData = (url: string, { onSuccessMessage, onErrorMessage }: CrudOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await http.delete(url)
      return res.data
    },
    onSuccess: () => {
      showToast(onSuccessMessage ?? 'Data deleted successfully!', 'success')
      queryClient.invalidateQueries()
    },
    onError: () => {
      showToast(onErrorMessage ?? 'Failed to delete data.', 'error')
    }
  })
}
