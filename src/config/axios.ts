import axios from "axios";
import { USER_TOKEN } from "../utils/constants";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;