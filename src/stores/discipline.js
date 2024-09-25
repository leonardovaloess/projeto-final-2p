import { defineStore } from "pinia";
import api from "@/api";

export const useDisciplineStore = defineStore("discipline", () => {
  async function createDiscipline(payload) {
    try {
      const response = await api.discipline.createDiscipline(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function editDiscipline(id, payload) {
    try {
      const response = await api.discipline.editDiscipline(id, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDisciplines() {
    try {
      const response = await api.discipline.getDisciplines();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteDiscipline(id, payload) {
    try {
      const response = await api.discipline.deleteDiscipline(id, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    createDiscipline,
    getDisciplines,
    editDiscipline,
    deleteDiscipline,
  };
});
