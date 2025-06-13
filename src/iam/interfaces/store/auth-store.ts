import { defineStore } from "pinia";
import router from "../../../router";
import { AuthService } from "../../infrastructure/services/auth.service";

const authService = new AuthService();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await authService.signIn(email, password);
        if (!response?.data?.token) throw new Error("Login failed");
        localStorage.setItem("token", response.data.token);
        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/home");
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },

    async register({ email, password, roleId, name, lastName }: { email: string; password: string; roleId: number; name?: string; lastName?: string }) {
      try {
        await authService.signUp(email, password, roleId, name, lastName);
      } catch (error) {
        console.error("Error during signup:", error);
        throw error;
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});