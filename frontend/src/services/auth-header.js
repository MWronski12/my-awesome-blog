import authService from "./auth.service";

export default function authHeader() {
  const token = authService.getToken();
  console.log(token);

  if (token) {
    return { "x-access-token": token }; // for Node.js Express back-end
  } else {
    return {};
  }
}
