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
        const user = await authService.signIn(email, password);

        if (!user) {
          throw new Error("Login failed");
        }

        this.user = user;

        localStorage.setItem("user", JSON.stringify(user));

        // mandar al home si todo oki
        console.log("on ta mi user:", this.user); // aqui ta
        router.push("/home");
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
