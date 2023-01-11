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
    const token = response.data.data;
    localStorage.setItem("user", token);
    return JSON.parse(Buffer.from(token.split(".")[1], "base64"));
  }

  logout() {
    localStorage.removeItem("user");
  }

  getToken() {
    return localStorage.getItem("user");
  }

  getUser() {
    return JSON.parse(Buffer.from(this.getToken().split(".")[1], "base64"));
  }
}

export default new AuthService();
