import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (config = {}): AxiosInstance => {
  const defaultConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    withCredentials: true,
  };

  const instance = axios.create({ ...defaultConfig, ...config });

  instance.interceptors.request.use(request => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  });

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
