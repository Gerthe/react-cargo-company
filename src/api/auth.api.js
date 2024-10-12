import axios from 'axios';
import { getHeaders } from './index.api';
import { API_URL } from '../config';

const apiName = 'users';

const authApi = {
  login: async (phone, password) => {
    const response = await axios.post(
      `${apiName}/login`,
      { phone, password },
      { baseURL: API_URL }
    );
    return response.data;
  },
  register: async (phone, password, name) => {
    const response = await axios.post(
      `${apiName}/register`,
      { phone, password, name },
      { baseURL: API_URL }
    );
    return response.data;
  },
  getUserById: async (id) => {
    const response = await axios.get(`${apiName}/${id}`, {
      headers: getHeaders(),
      baseURL: API_URL,
    });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isLogged: () => {
    return !!localStorage.getItem('token');
  },
};

export default authApi;
