import { defineStore } from "pinia";
import api from "@/api";

export const useWarningsStore = defineStore("warnings", () => {
  async function getWarnings(disciplina_id) {
    try {
      const response = await api.warnings.getWarnings(disciplina_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteWarning(Warning_id) {
    try {
      const response = await api.warnings.deleteWarning(Warning_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function createWarning(payload) {
    try {
      const response = await api.warnings.createWarning(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getWarningById(warning_id) {
    try {
      const response = await api.warnings.getWarningById(warning_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getWarningComments(warning_id) {
    try {
      const response = await api.warnings.getWarningComments(warning_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postWarningComment(data) {
    try {
      const response = await api.warnings.postWarningComment(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteWarningComment(warning_id) {
    try {
      const response = await api.warnings.deleteWarningComment(warning_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    createWarning,
    getWarnings,
    deleteWarning,
    getWarningById,
    getWarningComments,
    deleteWarningComment,
    postWarningComment,
  };
});
