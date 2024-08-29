import { defineStore } from "pinia";
import api from "@/api";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});

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

  async function userInfo(user_id) {
    try {
      const response = await api.auth.userInfo(user_id);
      user.value = response.data;
      return response.data;
    } catch (error) {}
  }

  async function userLogout() {
    try {
      const response = await api.auth.userLogout();
      user.value = response.data;
      return response.data;
    } catch (error) {}
  }


  return { 
    user, 
    userLogin, 
    userInfo, 
    registerUser,
    userLogout,
  };
});
