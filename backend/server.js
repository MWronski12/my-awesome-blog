"use strict";

import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { router } from "./app/router/index.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
