import axios, { type AxiosInstance } from "axios";

export class HttpService {
    protected http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            baseURL: "https://ecoguardian-cgenhdd6dadrgbfz.brazilsouth-01.azurewebsites.net/api/v1",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
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
