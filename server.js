import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/search", searchRoutes);
app.use("/api/post", postRoutes);
app.use("/api", uploadRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
