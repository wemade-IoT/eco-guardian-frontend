import { HttpService } from "../../../shared/services/http-common";

export class AuthService extends HttpService {

  public async signIn(email: string, password: string): Promise<any> {
    try {
      const payload = { email, password };
      const response = await this.http.post("authentication/sign-in", payload);
      console.log("Login successful, response:", response.data);
      return response;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  public async signUp(email: string, password: string, roleId: number): Promise<any> {
    try {
      const payload: any = { email, password, roleId };
      return await this.http.post(`authentication/sign-up`, payload);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }
}
