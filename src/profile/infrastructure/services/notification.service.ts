import type {NotificationResponse} from "../../domain/notification-response.ts";
import {HttpService} from "../../../shared/services/http-common.ts";

export class NotificationService extends HttpService {

  public async getNotifications(profileId:number): Promise<any> {
    try {
      return await this.http.get<NotificationResponse[]>(`/notification?profileId=${profileId}`);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }
}
