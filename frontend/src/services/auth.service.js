import axios from "axios";
import { Buffer } from "buffer";

class AuthService {
  register(username, email, password) {
    return axios.post(import.meta.env.VITE_API_BASE_URL + "/auth/signup", {
      username,
      email,
      password,
    });
  }

  async login(username, password) {
    const response = await axios.post(
      import.meta.env.VITE_API_BASE_URL + "/auth/signin",
      { username, password }
    );
    localStorage.setItem(
      "user",
      JSON.stringify({ data: response.data.user, token: response.data.token })
    );
    return response;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user.token;
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isAdminOrModerator(user) {
    if (user === null) {
      return false;
    } else if (user.roles.includes("MODERATOR")) {
      return true;
    } else if (user.roles.includes("ADMIN")) {
      return true;
    }
    return false;
  }
}

export default new AuthService();
