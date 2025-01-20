import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createPost, getPostById, getUserPosts } from "../controllers/post.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.post("/", authMiddleware, upload.single("images"), createPost);
router.get("/all", authMiddleware, getUserPosts);

export default router;
