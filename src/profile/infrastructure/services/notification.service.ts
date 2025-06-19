import { notifications } from "../../../assets/data/notifications";

export class NotificationService {

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
