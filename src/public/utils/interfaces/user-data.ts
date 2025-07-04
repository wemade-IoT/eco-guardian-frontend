export interface UserData {
  name: string;
  email: string;
  password: string;
  lastName: string; //I appears this is "username" in the database
  avatarUrl?: File | null; // Optional, can be null if not provided
  subscriptionId: number;
}