import axios from 'axios';
import authApi from './auth.api';
import { API_URL } from '../config';

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: getHeaders(),
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if it's successful
    return response;
  },
  (error) => {
    // Check if error is related to token expiration (e.g., 401 or specific error code)
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, trigger logout
      authApi.logout();
      window.location.href = '/login'; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
