import type {AxiosInstance} from "axios";
import axios from "axios";

export class AuthService {
  private baseUrl: string = "";
  private http!: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async signIn(email: string, password: string): Promise<any> {
  try {
    return await this.http.get(`${this.baseUrl}/users?email=${email}&password=${password}`);
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
}
