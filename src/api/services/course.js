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
  cadastrarAlunosNoCurso: (data) => {
    return httpClient.post(`/alunosCursos`, data); //curso_id, alunos => [{aluno_id: 1}, {aluno_id: 2}]
  },
  alunosCadastradosNoCurso: (curso_id) => {
    return httpClient.get(`/alunosCursos/${curso_id}`); //curso_id, alunos => [{aluno_id: 1}, {aluno_id: 2}]
  },
});
