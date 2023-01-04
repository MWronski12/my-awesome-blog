import { signUp, login } from "../controllers/auth.controller.js";

export const registerAuthRoutes = (router) => {
  router.post("/auth/signup", signUp);
  router.post("/auth/login", login);
};
