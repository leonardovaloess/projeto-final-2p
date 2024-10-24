export default (httpClient) => ({
  createWarning: (data) => {
    return httpClient.post("/avisos", data); //Aviso Disciplina_id
  },
  deleteWarning: (Warning_id) => {
    return httpClient.delete(`/avisos/${Warning_id}`); //nome, descricao, periodos
  },
  getWarnings: (disciplina_id) => {
    return httpClient.get(`/avisos/${disciplina_id}`); //nome, descricao, periodos
  },
  getWarningById: (Warning_id) => {
    return httpClient.get(`/getAviso/${Warning_id}`); //nome, descricao, periodos
  },
});
