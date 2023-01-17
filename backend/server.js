"use strict";

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import { router } from "./app/router/index.js";

const app = express();

// CORS
const corsOptions = { origin: process.env.CORS_URL };
app.use(cors(corsOptions));

// Logger
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

// JSON body parser
app.use(bodyParser.json());

// Global headers
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// router
app.use("/api", router);

// app
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

export { app };
