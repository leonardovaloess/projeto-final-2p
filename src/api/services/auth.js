export default (httpClient) => ({
  userLogin: (data) => {
    return httpClient.post("/login", data);
  },
  registerUser: (data) => {
    return httpClient.post("/register", data);
  },
  userLogout: () => {
    return httpClient.post("/logout");
  },
  recoverPassword: (payload) => {
    return httpClient.post("/recuperarSenha", payload);
  },
});
