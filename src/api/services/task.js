export default (httpClient) => ({
  createTask: (data) => {
    return httpClient.post("/tarefas", data); //nome, descricao, periodos
  },
  getTasks: (data) => {
    return httpClient.get("/tarefas", data); //nome, descricao, periodos
  },
});
