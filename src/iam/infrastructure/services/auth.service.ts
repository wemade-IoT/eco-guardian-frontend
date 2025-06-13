import type { AxiosInstance } from "axios";
import { HttpService } from "../../../shared/services/http-common";

export class AuthService {
  private http: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = new HttpService().http;
  }

  public async signIn(email: string, password: string): Promise<any> {
  try {
    const payload = { email, password };
    return await this.http.post(`${this.baseUrl}/authentication/sign-in`, payload);
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

  public async signUp(email: string, password: string, roleId: number, name?: string, lastName?: string): Promise<any> {
  try {
    const payload: any = { email, password, roleId };
    if (name) payload.name = name;
    if (lastName) payload.lastName = lastName;
    return await this.http.post(`${this.baseUrl}/authentication/sign-up`, payload);
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}
}