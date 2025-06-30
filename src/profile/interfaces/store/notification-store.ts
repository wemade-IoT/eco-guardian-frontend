import {NotificationService} from "../../infrastructure/services/notification.service.ts";
import {defineStore} from "pinia";
import {NotificationResponse} from "../../domain/notification-response.ts";

const notificationService = new NotificationService();
export const useNotificationStore = defineStore("notification", {
    state: () => ({
        notifications: [] as NotificationResponse[],
    }),
    actions: {
        async getNotifications(profileId: number) {
            try {
                const response = await notificationService.getNotifications(profileId);
                this.notifications = response.data.map((notification: any) => new NotificationResponse(
                    notification.id,
                    notification.title,
                    notification.subject,
                    notification.createdAt,
                    notification.profileId
                ));
            } catch (error) {
                console.error("Error fetching notifications:", error);
                throw error;
            }
        },
    },
})