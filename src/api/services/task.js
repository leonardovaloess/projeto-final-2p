export default (httpClient) => ({
  createTask: (data) => {
    return httpClient.post("/tarefas", data); //nome, descricao, periodos
  },
  deleteTask: (task_id) => {
    return httpClient.delete(`/deletarTarefa/${task_id}`); //nome, descricao, periodos
  },
  getTasks: (disciplina_id) => {
    return httpClient.get(`getTarefasDisciplinas/${disciplina_id}`); //nome, descricao, periodos
  },

  getTaskById: (task_id) => {
    return httpClient.get(`/getTarefa/${task_id}`); //nome, descricao, periodos
  },
  postTaskFile: (payload) => {
    return httpClient.post(`/materiais`, payload); //nome, descricao, periodos
  },
  getTaskFile: (tarefa_id) => {
    return httpClient.get(`/materiais/${tarefa_id}`); //nome, descricao, periodos
  },
});
