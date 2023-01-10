import express from "express";
import { registerAuthRoutes } from "./auth.routes.js";
import { registerPostRoutes } from "./post.routes.js";
import { registerCommentRoutes } from "./comment.routes.js";

const router = express.Router();
registerAuthRoutes(router);
registerPostRoutes(router);
registerCommentRoutes(router);

export { router };
