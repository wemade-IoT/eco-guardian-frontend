export class ProfileResponse{
    id: number;
    name: string;
    lastName: string;
    email: string;
    address: string;
    avatarUrl: string;
    userId: number;
    subscriptionId: number;
    constructor(id: number, name: string, lastName: string, email: string, address: string, avatarUrl: string, userId: number, subscriptionId: number) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.avatarUrl = avatarUrl;
        this.userId = userId;
        this.subscriptionId = subscriptionId;
    }
}