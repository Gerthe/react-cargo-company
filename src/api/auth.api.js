import axiosInstance from './index.api';

const apiName = 'users';

const authApi = {
  login: async (phone, password) => {
    const response = await axiosInstance.post(`${apiName}/login`, {
      phone,
      password,
    });

    return response.data;
  },
  register: async (phone, password, name) => {
    const response = await axiosInstance.post(`${apiName}/register`, {
      phone,
      password,
      name,
    });

    return response.data;
  },
  getUserById: async (id) => {
    const response = await axiosInstance.get(`${apiName}/${id}`);

    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isLogged: () => {
    return !!localStorage.getItem('token');
  },
  requestPasswordReset: async (phone) => {
    const response = await axiosInstance.post(
      `${apiName}/request-password-reset`,
      {
        phone,
      }
    );

    return response.data;
  },
  resetPassword: async (phone, resetCode, password) => {
    const response = await axiosInstance.post(`${apiName}/password-reset`, {
      phone,
      resetCode,
      password,
    });

    return response.data;
  },
};

export default authApi;
