import { API_URL } from '../config';
import axios from 'axios';
import { getHeaders } from './index.api';

const apiName = 'logs';

const logsApi = {
  getLogs: async (pagination, sorting, filters, search) => {
    const { page, limit } = pagination;
    const { sortBy, order } = sorting;

    // Construct the query parameters
    const params = {
      page,
      limit,
      sortBy,
      order,
      'filter[status]': filters.status,
      'filter[name]': filters.name, // Add other filters similarly
      search,
    };

    const response = await axios.get(apiName, {
      params,
      headers: getHeaders(),
      baseURL: API_URL,
    });
    return response.data;
  },
};

export default logsApi;
