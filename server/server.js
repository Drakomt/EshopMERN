import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./Routes/userRouter.js";
import seedRouter from "./Routes/seedRouter.js";
import express from "express";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  // .catch((e) => console.log(e));
});
