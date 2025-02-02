import axios from 'axios'
import { PLATFORM } from 'enums/common'
import { toast } from 'react-toastify'
import routes from 'routes'
import { IHeader } from './constants'

const API_URL = 'http://localhost:8044'

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use(function (config: any) {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
  }
  return config
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error?.response?.data?.code === 401) {
      handleUnauthorized()
      // toast.error(error?.response?.data?.message)
    }
    console.error('API', 'error', error)
    const errorMessage = error.response.data.message
    toast.error(errorMessage)
    // throw new Error(errorMessage)
  }
)

export function auth(): IHeader {
  if (typeof window === 'undefined') {
    return {}
  }
  const token = localStorage.getItem('accessToken') ?? sessionStorage.getItem('accessToken') ?? ''
  return { Authorization: `Bearer ${token}` }
}

export function handleUnauthorized(): void {
  if (window.location.href.includes(PLATFORM.CMS)) {
    localStorage.removeItem('cmsToken')
    localStorage.removeItem('cmsUserId')
    setTimeout(() => {
      window.location.href = routes.cms.login.value
    }, 3000)
  }
}

export function handleError(error: Error, filePath: string, functionName: string) {
  const errorPath = `Error: ${filePath} -> ${functionName} -> error: ${error}`
  console.error(errorPath, JSON.stringify(error))
}

export default api
