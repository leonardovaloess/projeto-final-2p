import { defineStore } from "pinia";
import api from "@/api";

export const useCourseStore = defineStore("course", () => {
  async function createCourse(payload) {
    try {
      const response = await api.course.createCourse(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function editCourse(id, payload) {
    try {
      const response = await api.course.editCourse(id, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCourses() {
    try {
      const response = await api.course.getCourses();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCourse(id, payload) {
    try {
      const response = await api.course.deleteCourse(id, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function cadastrarAlunosNoCurso(payload) {
    try {
      const response = await api.course.cadastrarAlunosNoCurso(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removerAlunoDoCurso(payload, id) {
    try {
      const response = await api.course.removerAlunoDoCurso(payload, id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function alunosCadastradosNoCurso(curso_id) {
    try {
      const response = await api.course.alunosCadastradosNoCurso(curso_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    createCourse,
    getCourses,
    editCourse,
    deleteCourse,
    cadastrarAlunosNoCurso,
    alunosCadastradosNoCurso,
    removerAlunoDoCurso,
  };
});
