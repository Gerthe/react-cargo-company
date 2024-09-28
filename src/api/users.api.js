import axios from 'axios';
import { getHeaders } from './index.api';

const baseUrl = 'http://localhost:3000/';
const apiUrl = 'api/users';

const usersApi = {
  getUsers: async () => {
    const response = await axios.get(apiUrl, {
      baseURL: baseUrl,
      headers: getHeaders(),
    });
    return response.data;
  },
  getUserById: async (id) => {
    const response = await axios.get(`${apiUrl}/${id}`, {
      baseURL: baseUrl,
      headers: getHeaders(),
    });
    return response.data;
  },
};

export default usersApi;
