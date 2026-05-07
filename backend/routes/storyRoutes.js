import { Router } from "express";
import {
  getAllStories,
  getStoryById,
  toggleBookmark,
  getBookmarks,
} from "../controllers/storyController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllStories);
router.get("/bookmarks", protect, getBookmarks);
router.get("/:id", getStoryById);
router.post("/:id/bookmark", protect, toggleBookmark);

export default router;