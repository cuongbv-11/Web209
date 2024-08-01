import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import mongoose from "mongoose";

dotenv.config();

const { PORT, DB_URI } = process.env;

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(DB_URI)
  .then(console.log("connected to database"))
  .catch((error) => {
    console.log("connect db that bai, error: ", error);
  });

app.use("/api", router);

app.listen(PORT | 8000, () => {
  console.log(`server is running on port ${PORT || 8000}`);
});
