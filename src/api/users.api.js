import axios from 'axios';
import { getHeaders } from './index.api';
import { API_URL } from '../config';

const apiName = 'users';

const usersApi = {
  getUsers: async () => {
    const response = await axios.get(apiName, {
      baseURL: API_URL,
      headers: getHeaders(),
    });
    return response.data;
  },
  getUserById: async (id) => {
    const response = await axios.get(`${apiName}/${id}`, {
      baseURL: API_URL,
      headers: getHeaders(),
    });
    return response.data;
  },
};

export default usersApi;
