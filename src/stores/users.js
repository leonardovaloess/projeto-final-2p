import { defineStore } from "pinia";
import api from "@/api";

export const useUserStore = defineStore("user", () => {
  async function createUser(payload) {
    try {
      const response = await api.user.createUser(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getProfessores() {
    try {
      const response = await api.user.getProfessors();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    createUser,
    getProfessores,
  };
});
