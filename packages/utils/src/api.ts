import axios from 'axios'

/**
 * The axios instance for the app.
 * This instance is configured with a base URL for the API.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
})
