import { Router } from "express";
import { updateProfileImage, getProfileImage } from "../controllers/upload.js";

const router = Router();

router.post("/upload", updateProfileImage);
router.get("/:userId/profile-image", getProfileImage);

export default router;
