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
  postTaskComment: (payload) => {
    return httpClient.post(`/comentarios/store`, payload); //nome, descricao, periodos
  },
  getTaskComment: (tarefa_id) => {
    return httpClient.get(`/comentarios/get/${tarefa_id}`); //nome, descricao, periodos
  },
  deleteTaskComment: (tarefa_id) => {
    return httpClient.delete(`/comentarios/delete/${tarefa_id}`); //nome, descricao, periodos
  },
  submitTask: (payload) => {
    return httpClient.post(`/enviarTarefa`, payload); //tarefa_id, arquivo, texto
  },
  getTaskStatus: (tarefa_id) => {
    return httpClient.get(`/getStatusTarefa/${tarefa_id}`); //nome, descricao, periodos
  },
  getUserCompletedTasksDashboard: (aluno_id) => {
    return httpClient.get(`/tarefasAlunosConcluidas/${aluno_id}`); //nome, descricao, periodos
  },
  getAllTasksStatus: () => {
    return httpClient.get(`/getStatusTodasTarefas`); //nome, descricao, periodos
  },
  getAllSubmitTasksByDiscipline: (disciplina_id) => {
    return httpClient.get(`/getTarefasEntregues/${disciplina_id}`); //nome, descricao, periodos
  },
  getTaskSubmitById: (envio_id) => {
    return httpClient.get(`/getEnvioTarefaById/${envio_id}`); //nome, descricao, periodos
  },
  postTaskGrade: (payload) => {
    return httpClient.post(`/notas`, payload); //nome, descricao, periodos
  },
  getTaskGrade: (tarefa_id) => {
    return httpClient.get(`/myNotas/${tarefa_id}`); //nome, descricao, periodos
  },
  getTasksAndGrades: (disciplina_id) => {
    return httpClient.get(`/getTarefasENotas/${disciplina_id}`); //nome, descricao, periodos
  },
});
