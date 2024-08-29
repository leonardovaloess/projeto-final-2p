export default (httpClient) => ({
  getToDoTasks: () => {
    return httpClient.get(`/to-do-tasks`);
  },
  getCompletedTasks: () => {
    return httpClient.get(`/completed-tasks`);
  },
  getTasks: () => {
    return httpClient.get(`/tasks`);
  },
  createTask: (payload) => {
    return httpClient.post("/tasks", payload);
  },
  toggleTaskStatus: (task_id, status) => {
    return httpClient.put(`toggle-task-status/${task_id}`, {
      done: status,
    });
  },
});
