import {
  isAdmin,
  isAdminOrModerator,
  verifyToken,
} from "../middleware/auth.middleware.js";
import { verifyCreatePostParameters } from "../middleware/verify.middleware.js";
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

export const registerPostRoutes = (router) => {
  router.get("/posts", getAllPosts);
  router.post(
    "/posts",
    [verifyToken, isAdminOrModerator, verifyCreatePostParameters],
    createPost
  );
  router.get("/posts/:id", getPost);
  router.patch("/posts/:id", [verifyToken, isAdminOrModerator], updatePost);
  router.delete("/posts/:id", [verifyToken, isAdminOrModerator], deletePost);
};
