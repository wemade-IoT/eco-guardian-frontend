import type { AxiosInstance } from "axios";
import axios from "axios";

export class NotificationService {
  private baseUrl: string = "";
  private http!: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async getNotifications(): Promise<any> {
    try {
      const response = await this.http.get(`${this.baseUrl}/notifications`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }
}