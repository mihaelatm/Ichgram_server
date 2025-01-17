import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createPost, getPostById, getUserPosts } from "../controllers/post.js";

const router = Router();

router.post("/", authMiddleware, createPost);
router.get("/all", authMiddleware, getUserPosts);
router.get("/single/:postId", authMiddleware, getPostById);

export default router;
