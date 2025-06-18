import type { AxiosInstance } from "axios";
import axios from "axios";

export class AuthService {
  private http: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:9080/api/v1/";
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async signIn(email: string, password: string): Promise<any> {
    try {
      const payload = { email, password };
      return await this.http.post(`${this.baseUrl}authentication/sign-in`, payload);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  public async signUp(email: string, password: string, roleId: number): Promise<any> {
    try {
      const payload: any = { email, password, roleId };
      return await this.http.post(`${this.baseUrl}authentication/sign-up`, payload);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }
}
