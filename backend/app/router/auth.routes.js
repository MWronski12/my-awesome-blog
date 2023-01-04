import { signUp, signIn } from "../controllers/auth.controller.js";
import {
  verifySignUpParameters,
  verifySignInParameters,
} from "../middleware/auth.middleware.js";

export const registerAuthRoutes = (router) => {
  router.post("/auth/signup", [verifySignUpParameters], signUp);
  router.post("/auth/signin", [verifySignInParameters], signIn);
};
