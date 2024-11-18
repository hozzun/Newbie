import axios, { AxiosInstance } from "axios";

const createAxiosSocketInstance = (config = {}): AxiosInstance => {
  const defaultConfig = {
    baseURL: import.meta.env.VITE_API_SOCKET_URL.replace("wss://", "https://").replace(
      "ws://",
      "http://",
    ),
    timeout: 10000,
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

const axiosSocketInstance = createAxiosSocketInstance();

export default axiosSocketInstance;
