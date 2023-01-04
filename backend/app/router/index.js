import express from "express";
import { registerAuthRoutes } from "./auth.routes.js";

const router = express.Router();

registerAuthRoutes(router);

export { router };
