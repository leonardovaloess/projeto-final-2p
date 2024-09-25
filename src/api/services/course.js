export default (httpClient) => ({
  createCourse: (data) => {
    return httpClient.post("/cursos", data); //nome, descricao, periodos
  },
  getCourses: () => {
    return httpClient.get("/cursos");
  },
  editCourse: (id, data) => {
    return httpClient.put(`/cursos/${id}`, data); //nome, descricao, periodos
  },
  deleteCourse: (id, data) => {
    return httpClient.delete(`/cursos/${id}`, data);
  },
});
