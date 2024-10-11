import { getHeaders } from './index.api';
import axios from 'axios';
import { API_URL } from '../config';

const apiName = 'shipments';

const shipmentsApi = {
  getShipments: async (pagination, sorting, filters, search) => {
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
  getShipmentById: async (id) => {
    const response = await axios.get(`${apiName}/${id}`, {
      headers: getHeaders(),
      baseURL: API_URL,
    });
    return response.data;
  },
  createShipment: async (shipment) => {
    const response = await axios.post(apiName, shipment, {
      headers: getHeaders(),
      baseURL: API_URL,
    });
    return response.data;
  },
  updateShipment: async (id, shipment) => {
    const response = await axios.put(`${apiName}/${id}`, shipment, {
      headers: getHeaders(),
      baseURL: API_URL,
    });
    return response.data;
  },
  getShipmentWithStatus: async (status) => {
    const response = await axios.get(`${apiName}/status/${status}`, {
      headers: getHeaders(),
      baseURL: API_URL,
    });
    return response.data;
  },
  deleteShipment: async (id) => {
    const response = await axios.delete(`${apiName}/${id}`, {
      headers: getHeaders(),
      baseURL: API_URL,
    });
    return response.data;
  },
};

export default shipmentsApi;
