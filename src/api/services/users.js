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
});
