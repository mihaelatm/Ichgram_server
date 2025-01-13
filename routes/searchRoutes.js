import { Router } from "express";
import { searchUsers, searchPosts } from "../controllers/search.js";

const router = Router();

router.get("/users", searchUsers);
router.get("/posts", searchPosts);

export default router;
