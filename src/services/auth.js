export default (httpClient) => ({
  register: async ({ name, email, password }) => {
    const response = await httpClient.post("/auth/register", {
      name,
      email,
      password,
    });
    let error = null;

    if (!response.data) {
      error = {
        status: response.request.status,
        statusText: response.request.statusText,
      };
    }
    return {
      data: response,
      error,
    };
  },

  login: async ({ email, password }) => {
    const response = await httpClient.post("/auth/login", {
      email,
      password,
    });
    let error = null;
    console.log(response);
    if (!response.data) {
      error = {
        status: response.request.status,
        statusText: response.request.statusText,
      };
    }
    return {
      data: response,
      error,
    };
  },
});
