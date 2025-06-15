import { defineStore } from "pinia";
import router from "../../../router";
import { AuthService } from "../../infrastructure/services/auth.service";
import {getClaimType} from "../../../public/utils/helpers/decodeTokenHelper.ts";

const authService = new AuthService();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: (() => {
      const storedUser = localStorage.getItem("user");
      try {
        return storedUser ? JSON.parse(storedUser) : "";
      } catch (error) {
        console.error("Invalid JSON in localStorage for 'user':", error);
        return "";
      }
    })(),
    role: getClaimType("role",localStorage.getItem("token") || "") || "",
    id: getClaimType("sid",localStorage.getItem("token") || "") || "",
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await authService.signIn(email, password);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
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