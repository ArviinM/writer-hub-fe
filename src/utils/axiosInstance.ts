import axios from 'axios'
import router from '../router' // Import the router instance

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Request interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    // If there's an error in the request, and it's not a retry attempt,
    // it might indicate the access token is invalid
    if (error.response && !error.config._retry) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshResponse = await axios.post('/auth/refresh', {
          refreshToken: localStorage.getItem('refreshToken'),
        })

        const newAccessToken = refreshResponse.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        router.push('/login')
        return Promise.reject(refreshError)
      }
    }

    // If the request fails and it's not a 403 (and not a retry),
    // it might indicate the access token is invalid
    if (
      error.response &&
      error.response.status !== 403 &&
      !originalRequest._retry
    ) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/login')
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
