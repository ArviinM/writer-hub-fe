// src/utils/axiosInstance.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Your backend API base URL
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
        // Attempt to refresh the access token
        const refreshResponse = await axios.post('/auth/refresh', {
          refreshToken: localStorage.getItem('refreshToken'),
        })

        const newAccessToken = refreshResponse.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        // Retry the original request
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // Token refresh failed, log out the user or handle the error appropriately
        console.error('Token refresh failed:', refreshError)
        // You might want to redirect the user to the login page here
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
