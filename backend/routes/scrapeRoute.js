
import express from "express";
import { triggerScrape } from "../controllers/scrapeController.js";

const router = express.Router();

router.post("/", triggerScrape);

export default router;

