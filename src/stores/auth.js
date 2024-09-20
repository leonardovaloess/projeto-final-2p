import { defineStore } from "pinia";
import api from "@/api";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  async function userLogin(payload) {
    try {
      const response = await api.auth.userLogin(payload);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function registerUser(payload) {
    try {
      const response = await api.auth.registerUser(payload);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function userLogout() {
    try {
      const response = await api.auth.userLogout();

      return response.data;
    } catch (error) {}
  }

  return {
    userLogin,

    registerUser,
    userLogout,
  };
});
