import {
  isAdmin,
  isAdminOrModerator,
  verifyToken,
} from "../middleware/auth.middleware.js";
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

export const registerPostRoutes = (router) => {
  router.get("/post", getAllPosts);
  router.post("/post", [verifyToken, isAdminOrModerator], createPost);
  router.get("/post/:id", getPost);
  router.patch("/post/:id", [verifyToken, isAdminOrModerator], updatePost);
  router.delete("/post/:id", [verifyToken, isAdminOrModerator], deletePost);
};
