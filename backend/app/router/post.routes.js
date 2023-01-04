import {
  verifyToken,
  isAdminOrModeratorOrOwner,
} from "../middleware/auth.middleware.js";
import { createPost, deletePost } from "../controllers/post.controller.js";

export const registerPostRoutes = (router) => {
  router.post("/posts", [verifyToken], createPost);
  router.delete(
    "/posts/:id",
    [verifyToken, isAdminOrModeratorOrOwner],
    deletePost
  );
};
