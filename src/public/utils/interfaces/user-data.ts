export interface UserData {
  name: string;
  email: string;
  password: string;
  lastName: string;
  avatarUrl?: File | null;
  subscriptionId: number;
}