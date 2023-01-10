import { createGlobalState } from "react-hooks-global-state";
import axios from "axios";

class AuthService {
  register(username, email, password) {
    return axios.post(import.meta.env.API_BASE_URL + "/auth/signup", {
      username,
      email,
      password,
    });
  }

  async login(username, password) {
    const response = await axios.post(
      import.meta.env.API_BASE_URL + "/auth/signin",
      {
        username,
        password,
      }
    );

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getUser() {
    return axios.get(import.meta.env.API_BASE_URL + "/users/")
  }

  getToken() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
