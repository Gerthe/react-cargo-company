import axios from 'axios';
import { getHeaders } from './index.api';

const baseUrl = 'http://localhost:3000/';
const apiUrl = 'api/users';

const authApi = {
  login: async (phone, password) => {
    const response = await axios.post(`${baseUrl}${apiUrl}/login`, {
      phone,
      password,
    });
    return response.data;
  },
  register: async (phone, password) => {
    const response = await axios.post(`${baseUrl}${apiUrl}/register`, {
      phone,
      password,
    });
    return response.data;
  },
  getUserById: async (id) => {
    const response = await axios.get(`${baseUrl}${apiUrl}/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  },
};

export default authApi;
