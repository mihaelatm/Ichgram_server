import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
