import type { AxiosInstance } from "axios";
import axios from "axios";
import { notifications } from "../../../assets/data/notifications";

export class NotificationService {
  private baseUrl: string = "";
  private http!: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  // TODO: POR AHORA CON FAKE DATA, LUEGO SE DEBE CONECTAR A LA API
  public async getNotifications(): Promise<any> {
    try {
      return notifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }
}
