export default (httpClient) => ({
  createTask: (data) => {
    return httpClient.post("/tarefas", data); //nome, descricao, periodos
  },
  deleteTask: (task_id) => {
    return httpClient.delete(`/deletarTarefa/${task_id}`); //nome, descricao, periodos
  },
  getTasks: (data) => {
    return httpClient.get("/tarefas", data); //nome, descricao, periodos
  },
  getTaskById: (task_id) => {
    return httpClient.get(`/getTarefa/${task_id}`); //nome, descricao, periodos
  },
  postTaskFile: (payload) => {
    return httpClient.post(`/materialComplementar`, payload); //nome, descricao, periodos
  },
});
