export default (httpClient) => ({
  createUser: (data) => {
    return httpClient.post("/registerUser", data);
  },
  getProfessors: () => {
    return httpClient.get("/professores");
  },
});
