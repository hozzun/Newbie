import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (config = {}): AxiosInstance => {
  const defaultConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  };

  return axios.create({ ...defaultConfig, ...config });
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
