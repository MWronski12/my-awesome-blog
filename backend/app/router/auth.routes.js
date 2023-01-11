import { signUp, signIn, grantRole } from "../controllers/auth.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";
import {
  verifySignUpParameters,
  verifySignInParameters,
  verifyGrantRoleParameters,
} from "../middleware/verify.middleware.js";

export const registerAuthRoutes = (router) => {
  router.post("/auth/signup", [verifySignUpParameters], signUp);
  router.post("/auth/signin", [verifySignInParameters], signIn);
  router.post(
    "/auth/grant-role",
    [verifyToken, isAdmin, verifyGrantRoleParameters],
    grantRole
  );
};
