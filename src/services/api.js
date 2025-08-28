import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-usuarios-1-wl51.onrender.com'
});

export default api;
