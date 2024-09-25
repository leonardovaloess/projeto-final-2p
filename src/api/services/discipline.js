export default (httpClient) => ({
  createDiscipline: (data) => {
    return httpClient.post("/disciplinas", data); //nome, carga horaria, professor_id curso_id
  },
  getDisciplines: (curso_id) => {
    return httpClient.get(`/disciplinas/${curso_id}`);
  },
  editDiscipline: (id, data) => {
    return httpClient.put(`/disciplinas/$${id}`, data); //nome, carga horaria, professor_id curso_id
  },
  deleteDiscipline: (id, data) => {
    return httpClient.delete(`/disciplinas${id}`, data);
  },
});
