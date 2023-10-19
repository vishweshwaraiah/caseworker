import axios from 'axios'
import { getToken } from './JwtToken'

const token = getToken()

const defaultOptions = {
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
}

export default axios.create(defaultOptions)
