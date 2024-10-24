import axiosInstance from './index.api';

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

    const response = await axiosInstance.get(apiName, { params });
    return response.data;
  },

  getShipmentById: async (id) => {
    const response = await axiosInstance.get(`${apiName}/${id}`);
    return response.data;
  },

  createShipment: async (shipment) => {
    const response = await axiosInstance.post(apiName, shipment);
    return response.data;
  },

  updateShipment: async (id, shipment) => {
    const response = await axiosInstance.put(`${apiName}/${id}`, shipment);
    return response.data;
  },

  updateShipmentStatus: async (id, status) => {
    const response = await axiosInstance.patch(`${apiName}/${id}/status`, {
      status,
    });
    return response.data;
  },

  getShipmentWithStatus: async (status) => {
    const response = await axiosInstance.get(`${apiName}/status/${status}`);
    return response.data;
  },

  deleteShipment: async (id) => {
    const response = await axiosInstance.delete(`${apiName}/${id}`);
    return response.data;
  },
};

export default shipmentsApi;
