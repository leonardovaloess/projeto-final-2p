export default (httpClient) => ({
  createDiscipline: (data) => {
    return httpClient.post("/disciplinas", data); //nome, carga horaria, professor_id curso_id
  },
  getDisciplines: (curso_id) => {
    return httpClient.get(`/disciplinas/${curso_id}`);
  },
  getDisciplinesStudent: (curso_id) => {
    return httpClient.get(`/getDisciplinas/${curso_id}`);
  },
  editDiscipline: (id, data) => {
    return httpClient.put(`/disciplinas/${id}`, data); //nome, carga horaria, professor_id curso_id
  },
  deleteDiscipline: (id, data) => {
    return httpClient.delete(`/disciplinas/${id}`, data);
  },

  getMyDisciplines: () => {
    return httpClient.get(`/myDisciplinas`);
  },

  getDisciplineById: (disciplina_id) => {
    return httpClient.get(`/getDisciplina/${disciplina_id}`);
  },
  getDisciplineProfessor: (disciplina_id) => {
    return httpClient.get(`/getProfessorDisciplina/${disciplina_id}`);
  },
});
