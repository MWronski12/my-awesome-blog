import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyCreateCommentParameters } from "../middleware/verify.middleware.js";
import {
  getPostComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

export const registerCommentRoutes = (router) => {
  router.get("/posts/:postId/comments", getPostComments);
  router.post(
    "/posts/:postId/comments",
    [verifyToken, verifyCreateCommentParameters],
    createComment
  );
  router.get("/posts/:postId/comments/:id", getComment);
  router.patch("/posts/:postId/comments/:id", [verifyToken], updateComment);
  router.delete("/posts/:postId/comments/:id", [verifyToken], deleteComment);
};
