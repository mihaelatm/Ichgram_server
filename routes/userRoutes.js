import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from "../controllers/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.get("/:userId", getUserProfile);
router.put("/update", authMiddleware, uploadProfileImage, updateUserProfile);
export default router;
