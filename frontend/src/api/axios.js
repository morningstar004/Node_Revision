import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4050/api/v1', // 🔁 replace PORT with your backend port
})

export default api