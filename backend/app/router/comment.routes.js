import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getPostComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";

export const registerPostRoutes = (router) => {
  router.get("/posts/:postId/comments", getPostComments);
  router.post("/posts/:postId/comment", [verifyToken], createComment);
  router.get("/posts/:postId/comments/id", getComment);
  router.patch(
    "/posts/:postId/comments/:id",
    [verifyToken],
    updateComment
  );
  router.delete(
    "/posts/:postId/comments/:id",
    [verifyToken],
    deleteComment
  );
};
