export class NotificationResponse{
    id: number;
    title: string;
    subject: string;
    createdAt:string;
    profileId:number;
    constructor( id: number, title: string, subject: string, createdAt: string, profileId: number) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.createdAt = createdAt;
        this.profileId = profileId;
    }
}