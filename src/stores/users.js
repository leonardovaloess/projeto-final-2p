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

  async function getAlunos() {
    try {
      const response = await api.user.getAlunos();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function editProfessor(id, payload) {
    try {
      const response = await api.user.editProfessor(id, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function editAluno(id, payload) {
    try {
      const response = await api.user.editAluno(id, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProfessor(id, payload) {
    try {
      const response = await api.user.deleteProfessor(id, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteAluno(id) {
    try {
      const response = await api.user.deleteAluno(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserProfile() {
    try {
      const response = await api.user.getUserProfile();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    createUser,
    editAluno,
    getAlunos,
    getProfessores,
    getUserProfile,
    editProfessor,
    deleteProfessor,
    deleteAluno,
  };
});
