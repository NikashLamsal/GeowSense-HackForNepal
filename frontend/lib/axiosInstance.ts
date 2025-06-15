import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000, //5 second
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken: string | null = window.localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
export default axiosInstance;
