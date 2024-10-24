import axiosInstance from './index.api';

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

    const response = await axiosInstance.get(apiName, {
      params,
    });

    return response.data;
  },
  getUserById: async (id) => {
    const response = await axiosInstance.get(`${apiName}/${id}`);
    return response.data;
  },
  getMyInfo: async () => {
    const response = await axiosInstance.get(`${apiName}/me`);
    return response.data;
  },
};

export default usersApi;
