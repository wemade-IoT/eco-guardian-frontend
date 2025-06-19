import type { AxiosInstance } from "axios";
import axios from "axios";
import { metrics } from "../../../assets/data/metrics.ts";

export class AnalyticsService {
  private baseUrl: string = "";
  private http!: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  // TODO: POR AHORA CON FAKE DATA, LUEGO SE DEBE CONECTAR A LA API
  public async getAnalytics(): Promise<any> {
    try {
      // Simula una petición HTTP retornando la constante local
      return metrics;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  }

  // TODO: POR AHORA CON FAKE DATA, LUEGO SE DEBE CONECTAR A LA API
  public async getWidgetAnalytics(): Promise<any[]> {
    try {
      return metrics.widgets;
    } catch (error) {
      console.error("Error fetching widget analytics:", error);
      throw error;
    }
  }
}
