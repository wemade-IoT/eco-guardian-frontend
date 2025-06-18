import { defineStore } from "pinia";
import router from "../../../router";
import { AuthService } from "../../infrastructure/services/auth.service";
import type { UserData } from "../../../public/utils/interfaces/user-data";
import {getClaimType} from "../../../public/utils/helpers/decodeTokenHelper.ts";

const authService = new AuthService();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: (() => {
      try {const storedUser = localStorage.getItem("user") || "";
        return storedUser ? JSON.parse(storedUser) : "";
      } catch (error) {
        console.error("Invalid JSON in localStorage for 'user':", error);
        return "";
      }
    })(),
    role: getClaimType("role",localStorage.getItem("token") || "") || "",
    id: getClaimType("sid",localStorage.getItem("token") || "") || "",
    isEnterprise: getClaimType("role",localStorage.getItem("token") || "") === "Enterprise" || false,
    isAdmin : getClaimType("role",localStorage.getItem("token") || "") === "Admin" || false,
    userData: {} as UserData,
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

    async register({ email, password, roleId }: { email: string; password: string; roleId: number }): Promise<any> {
      try {
      const response = await authService.signUp(email, password, roleId);
      return response.data;
      } catch (error) {
      console.error("Error during signup:", error);
      throw error;
      }
    },

    // this method is used to set the user data after register
    setUserData(user: UserData) {
      this.userData = user;
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});