import axios from 'axios'
import { getToken } from './JwtToken'

const defaultOptions = {
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
}

const instance = axios.create(defaultOptions)

instance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default instance
