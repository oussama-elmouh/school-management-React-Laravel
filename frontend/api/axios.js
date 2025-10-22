import axios from 'axios'
import { Import } from 'lucide-react'

export const axiosClient = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL 
   
})