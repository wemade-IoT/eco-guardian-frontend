export class ProfileRequest{
    name: string;
    username: string;
    email: string;
    address: string;
    avatarUrl: File
    userId: number;
    subscriptionId: number;
    constructor(name: string, username: string, email: string, address: string, avatarUrl: File, userId: number, subscriptionId: number) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.avatarUrl = avatarUrl;
        this.userId = userId;
        this.subscriptionId = subscriptionId;
    }
}