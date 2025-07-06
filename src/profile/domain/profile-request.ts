export class ProfileRequest{
    Name: string;
    LastName: string;
    Email: string;
    Address: string;
    AvatarUrl: File
    UserId: number;
    SubscriptionId: number;
    constructor(name: string, lastName: string, email: string, address: string, avatarUrl: File, userId: number, subscriptionId: number) {
        this.Name = name;
        this.LastName = lastName;
        this.Email = email;
        this.Address = address;
        this.AvatarUrl = avatarUrl;
        this.UserId = userId;
        this.SubscriptionId = subscriptionId;
    }
}