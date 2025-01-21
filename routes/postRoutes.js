import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getPostById,
  getUserPosts,
  updatePost,
} from "../controllers/post.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.post("/", authMiddleware, upload.single("images"), createPost);
router.get("/all", authMiddleware, getUserPosts);
router.get("/single/:postId", authMiddleware, getPostById);
router.delete("/:postId", authMiddleware, deletePost);
router.put("/:postId", authMiddleware, updatePost);

export default router;
