import axios, { type AxiosInstance } from "axios";

// config for token access in whole applicacion from localStorage
export class HttpService {
  protected http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    this.http.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}