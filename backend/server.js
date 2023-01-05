"use strict";

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { router } from "./app/router/index.js";

const app = express();

// middleware
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// router
app.use("/api", router);

// main
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

export { app };
