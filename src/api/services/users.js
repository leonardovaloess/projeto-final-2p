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

  getUserProfile: (id) => {
    return httpClient.get(`/perfil`);
  },

  editUserProfile: (payload) => {
    return httpClient.put(`/updatePerfil`, payload); //nome email senha
  },

  editUserPassword: (payload) => {
    return httpClient.put(`/updateSenha`, payload); //senha atual e nova senha
  },

  forgotPassword: (payload) => {
    return httpClient.put(`/forgotPassword`, payload); // email senha
  },

  getStudentsByProfessor: () => {
    return httpClient.get(`/alunosProf`);
  },
  getAlunoById: (aluno_id) => {
    return httpClient.get(`/getAluno/${aluno_id}`);
  },
});
