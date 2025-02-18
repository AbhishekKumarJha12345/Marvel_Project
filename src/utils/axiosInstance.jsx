import { meta } from '@eslint/js';
import axios from 'axios';
import.meta.env.VITE_APP_API_URL
const backendIP=import.meta.env.VITE_APP_API_URL
const axiosInstance = axios.create({
  baseURL: backendIP, 
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(backendIP)

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || import.meta.env.VITE_REACT_APP_TOKEN;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
