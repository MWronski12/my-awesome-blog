"use strict";

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { router } from "./app/router/index.js";

const app = express();

app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
