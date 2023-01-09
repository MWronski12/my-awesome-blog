import { verifyToken } from "../middleware/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

export const registerUserRoutes = (router) => {
  router.get("/users/:id", [verifyToken], getUser);
};
