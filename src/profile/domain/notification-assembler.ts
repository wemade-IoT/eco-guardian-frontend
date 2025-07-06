import {NotificationResponse} from "./notification-response.ts";

export class NotificationAssembler{
    static toResponse(notification: any): NotificationResponse {
        return new NotificationResponse(
            notification.id,
            notification.title,
            notification.subject,
            notification.createdAt,
            notification.profileId
        );
    }


}