export default (httpClient) => ({
  userLogin: (data) => {
    return httpClient.post("/login", data);
  },
  registerUser: (data) => {
    return httpClient.post("/sign-up", data);
  },
  userLogout: () => {
    return httpClient.post("/logout");
  },
});
