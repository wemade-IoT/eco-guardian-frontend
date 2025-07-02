export class ProfileResponse{
    id: number;
    name: string;
    username: string;
    email: string;
    address: string;
    avatarUrl: string;
    userId: number;
    subscriptionId: number;
    constructor(id: number, name: string, username: string, email: string, address: string, avatarUrl: string, userId: number, subscriptionId: number) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.avatarUrl = avatarUrl;
        this.userId = userId;
        this.subscriptionId = subscriptionId;
    }
}