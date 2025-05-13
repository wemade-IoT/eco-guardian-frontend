import type { AxiosInstance } from "axios";
import axios from "axios";

export class ManagementService {
  private baseUrl: string = "";
  private http!: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async getPlants(): Promise<any> {
    try {
      const response = await this.http.get(`${this.baseUrl}/plants`);
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  }
}
