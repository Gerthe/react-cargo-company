import axios from 'axios';
import { getHeaders } from './index.api';
import { API_URL } from '../config';

const apiName = 'users';

const usersApi = {
  getUsers: async (pagination, sorting, filters, search) => {
    const { current, pageSize } = pagination;

    //TODO: sort and filters

    // Construct the query parameters
    const params = {
      page: current,
      limit: pageSize,
      search,
    };

    const response = await axios.get(apiName, {
      params,
      headers: getHeaders(),
      baseURL: API_URL,
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
