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
  router.post("/posts/:postId/comment", [verifyToken], createComment);
  router.patch(
    "/posts/:postId/comments/:id",
    [verifyToken, isAdminOrModerator],
    updatePost
  );
  router.delete(
    "/posts/:postId/comments/:id",
    [verifyToken, isAdminOrModerator],
    deletePost
  );
};
