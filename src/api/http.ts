import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class Http {
  instance: AxiosInstance

  constructor(baseURL: string = 'http://localhost:3000/api/v1', headers: Record<string, string> = {}) {
    let authHeader = headers['Authorization'] || localStorage.getItem('Authorization') || null

    if (authHeader && !authHeader.startsWith('Bearer ')) {
      authHeader = `Bearer ${authHeader}`
    }

    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        ...(authHeader ? { Authorization: authHeader } : {})
      }
    })
  }

  // Phương thức GET
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config)
  }

  // Phương thức POST
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config)
  }

  // Phương thức PUT
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config)
  }

  // Phương thức DELETE
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config)
  }
}

const http = new Http().instance
export { http }
export default Http
