import axios from 'axios'

export const apiClient = axios.create({
    timeout: 10000,
    baseURL: import.meta.env.VITE_API_BACKEND,
    headers: {
        'Content-Type': 'application/json',
    }
})