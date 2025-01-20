import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadProfileImage } from "../controllers/post.js";

const router = Router();

router.get("/:userId", getUserProfile);
router.put("/update", authMiddleware, uploadProfileImage, updateUserProfile);
export default router;
