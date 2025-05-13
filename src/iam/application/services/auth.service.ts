import type { AxiosInstance } from "axios";
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
    // Hacemos GET para obtener todos los usuarios
    const response = await this.http.get(`${this.baseUrl}/users`);

    // Verifica si response.data es un array
    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected response format: data is not an array");
    }

    // Busca el usuario cuyo email coincida
    const user = response.data.find((u: any) => u.email === email);

    if (!user) throw new Error("User not found");

    // Simula la validación de la contraseña
    if (user.password !== password) throw new Error("Invalid password");

    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
}
