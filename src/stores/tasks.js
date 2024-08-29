import { defineStore } from "pinia";
import api from "@/api";

export const useTaskStore = defineStore("task", () => {
  async function getTasks() {
    try {
      const response = await api.task.getTasks();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCompletedTasks() {
    try {
      const response = await api.task.getCompletedTasks();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getToDoTasks() {
    try {
      const response = await api.task.getToDoTasks();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function createTask(payload) {
    try {
      const response = await api.task.createTask(payload);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleTaskStatus(task_id, status) {
    try {
      const response = await api.task.toggleTaskStatus(task_id, status);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getTasks,
    getCompletedTasks,
    getToDoTasks,
    createTask,
    toggleTaskStatus,
  };
});
