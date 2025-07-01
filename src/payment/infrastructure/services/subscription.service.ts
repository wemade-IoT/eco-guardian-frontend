import { HttpService } from "../../../shared/services/http-common";

export class SubscriptionService extends HttpService {
  public async createSubscription(req: any): Promise<string> {
    try {
      const response = await this.http.post("subscriptions", req);
      return response.data;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  }

  public async getAllSubscriptions(): Promise<any> {
    try {
      const response = await this.http.get("subscriptions/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all subscriptions:", error);
      throw error;
    }
  }

  public async getSubscriptionByUserId(userId: string): Promise<any> {
    try {
      const response = await this.http.get(`subscriptions/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription by user ID:", error);
      throw error;
    }
  }
}