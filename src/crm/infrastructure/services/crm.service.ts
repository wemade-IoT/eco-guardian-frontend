import type { AxiosInstance } from "axios";
import axios from "axios";

export class CrmService {
  private baseUrl: string = "";
  private http!: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async getConsulting(): Promise<any> {
    try {
      const response = await this.http.get(`${this.baseUrl}/queries`);
      console.log("Response from crm service:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching crm:", error);
      throw error;
    }
  }
}
