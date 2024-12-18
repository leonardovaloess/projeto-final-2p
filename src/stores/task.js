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

  async function getTasks(disciplina_id) {
    try {
      const response = await api.task.getTasks(disciplina_id);
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

  async function getTaskFile(tarefa_id) {
    try {
      const response = await api.task.getTaskFile(tarefa_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTaskComment(tarefa_id) {
    try {
      const response = await api.task.getTaskComment(tarefa_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getTaskStatus(tarefa_id) {
    try {
      const response = await api.task.getTaskStatus(tarefa_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postTaskComment(data) {
    try {
      const response = await api.task.postTaskComment(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTaskComment(data) {
    try {
      const response = await api.task.deleteTaskComment(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function submitTask(data) {
    try {
      const response = await api.task.submitTask(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserCompletedTasksDashboard(aluno_id) {
    try {
      const response = await api.task.getUserCompletedTasksDashboard(aluno_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllTasksStatus() {
    try {
      const response = await api.task.getAllTasksStatus();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllSubmitTasksByDiscipline(disciplina_id) {
    try {
      const response = await api.task.getAllSubmitTasksByDiscipline(
        disciplina_id
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTaskSubmitById(envio_id) {
    try {
      const response = await api.task.getTaskSubmitById(envio_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postTaskGrade(payload) {
    try {
      const response = await api.task.postTaskGrade(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTaskGrade(tarefa_id) {
    try {
      const response = await api.task.getTaskGrade(tarefa_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTasksAndGrades(disciplina_id) {
    try {
      const response = await api.task.getTasksAndGrades(disciplina_id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  return {
    createTask,
    getTasks,
    getTaskById,
    getTaskStatus,
    deleteTask,
    postTaskFile,
    getTaskFile,
    getTaskComment,
    postTaskComment,
    deleteTaskComment,
    submitTask,
    getUserCompletedTasksDashboard,
    getAllTasksStatus,
    getAllSubmitTasksByDiscipline,
    getTaskSubmitById,
    postTaskGrade,
    getTaskGrade,
    getTasksAndGrades,
  };
});
