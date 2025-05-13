import type { AxiosInstance } from "axios";
import axios from "axios";

export class AnalyticsService {
  private baseUrl: string = "";
  private http!: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async getAnalytics(): Promise<any> {
    try {
      const response = await this.http.get(`${this.baseUrl}/metrics`);
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  }

  public async getWidgetAnalytics(): Promise<any[]> {
    try {
      const response = await this.http.get(`${this.baseUrl}/metrics`);
      return response.data.widgets;
    } catch (error) {
      console.error("Error fetching widget analytics:", error);
      throw error;
    }
  }
}
