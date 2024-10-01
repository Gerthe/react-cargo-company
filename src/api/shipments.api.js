import { getHeaders } from './index.api';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/';
const apiUrl = 'api/shipments';

const shipmentsApi = {
  getShipments: async (filter) => {
    const response = await axios.get(apiUrl, {
      params: filter,
      headers: getHeaders(),
      baseURL: baseUrl,
    });
    return response.data;
  },
  getShipmentById: async (id) => {
    const response = await axios.get(`${apiUrl}/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  },
  createShipment: async (shipment) => {
    const response = await axios.post(apiUrl, shipment, {
      headers: getHeaders(),
    });
    return response.data;
  },
  updateShipment: async (id, shipment) => {
    const response = await axios.put(`${apiUrl}/${id}`, shipment, {
      headers: getHeaders(),
    });
    return response.data;
  },
  getShipmentWithStatus: async (status) => {
    const response = await axios.get(`${apiUrl}/status/${status}`, {
      headers: getHeaders(),
    });
    return response.data;
  },
};

export default shipmentsApi;
