import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:userId", getUserProfile);
router.put("/update", authMiddleware, updateUserProfile);

export default router;
