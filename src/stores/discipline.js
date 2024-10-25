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

  async function getDisciplines(curso_id) {
    try {
      const response = await api.discipline.getDisciplines(curso_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDisciplinesStudent(curso_id) {
    try {
      const response = await api.discipline.getDisciplinesStudent(curso_id);
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

  async function getMyDisciplines() {
    try {
      const response = await api.discipline.getMyDisciplines();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDisciplineById(disciplina_id) {
    try {
      const response = await api.discipline.getDisciplineById(disciplina_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDisciplineProfessor(disciplina_id) {
    try {
      const response = await api.discipline.getDisciplineProfessor(
        disciplina_id
      );
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
    getMyDisciplines,
    getDisciplineById,
    getDisciplineProfessor,
    getDisciplinesStudent,
  };
});
