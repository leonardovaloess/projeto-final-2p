export default (httpClient) => ({
  createUser: (data) => {
    return httpClient.post("/registerUser", data);
  },
  getProfessors: () => {
    return httpClient.get("/professores");
  },
  editProfessor: (id, payload) => {
    return httpClient.put(`/professores/${id}`, payload);
  },
  deleteProfessor: (id) => {
    return httpClient.delete(`/professores/${id}`);
  },

  editAluno: (id, payload) => {
    return httpClient.put(`/alunos/${id}`, payload);
  },
  getAlunos: () => {
    return httpClient.get("/alunos");
  },

  deleteAluno: (id) => {
    return httpClient.delete(`/alunos/${id}`);
  },
});
