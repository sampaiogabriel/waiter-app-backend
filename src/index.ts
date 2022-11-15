import express from "express";
import mongoose from "mongoose";
import path from "node:path";

const PORT = 3001;
const MONGODB_URL = "mongodb://localhost:27017";

import { router } from "./router";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    const app = express();

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );

    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.error("Erro ao conectar no Mongo DB"));
