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

  return {
    createCourse,
    getCourses,
    editCourse,
    deleteCourse,
  };
});