import { defineStore } from "pinia";
import api from "@/api";

export const useTaskStore = defineStore("task", () => {
  async function createTask(payload) {
    try {
      const response = await api.task.createTask(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTask(payload) {
    try {
      const response = await api.task.deleteTask(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTasks() {
    try {
      const response = await api.task.getTasks();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTaskById(task_id) {
    try {
      const response = await api.task.getTaskById(task_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postTaskFile(payload) {
    try {
      const response = await api.task.postTaskFile(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  return {
    createTask,
    getTasks,
    getTaskById,
    deleteTask,
    postTaskFile,
  };
});
