export default (httpClient) => ({
  userLogin: (data) => {
    return httpClient.post("/login", data);
  },
  registerUser: (data) => {
    return httpClient.post("/api/sign-up", data);
  },
  userLogout: () => {
    return httpClient.post("/api/logout");
  },
});
