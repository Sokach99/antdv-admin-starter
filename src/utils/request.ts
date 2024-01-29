import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { STORAGE_AUTHORIZE_KEY, useAuthorization } from '@/hooks/authorization'
import router from '@/router'
import { useNotification } from '@/hooks/global-config'

export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
})
async function requestHandler(config: InternalAxiosRequestConfig & { token?: string }): Promise<InternalAxiosRequestConfig> {
  // 处理请求前的url
  if (
    import.meta.env.DEV
      && import.meta.env.VITE_APP_BASE_API_DEV
      && import.meta.env.VITE_APP_BASE_URL_DEV
  ) {
    //  替换url的请求前缀baseUrl
    config.baseURL = import.meta.env.VITE_APP_BASE_API_DEV
  }
  const token = useAuthorization()

  if (token.value)
    config.headers.set(STORAGE_AUTHORIZE_KEY, token.value)
  return config
}

function responseHandler(response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any {
  return response.data
}

function errorHandler(error: AxiosError): Promise<any> {
  const token = useAuthorization()
  const notification = useNotification()

  if (error.response) {
    const { data, status, statusText } = error.response as AxiosResponse<ResponseBody>
    if (status === 401) {
      notification?.error({
        message: '401',
        description: data?.msg || statusText,
        duration: 3,
      })
      /**
       * 这里处理清空用户信息和token的逻辑，后续扩展
       */
      token.value = null
      router
        .push({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        })
        .then(() => {})
    }
    else if (status === 403) {
      notification?.error({
        message: '403',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
    else if (status === 500) {
      notification?.error({
        message: '500',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
    else {
      notification?.error({
        message: '服务错误',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
  }
  return Promise.reject(error)
}

instance.interceptors.request.use(requestHandler)

instance.interceptors.response.use(responseHandler, errorHandler)

export default instance
