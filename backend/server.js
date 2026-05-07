import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import scrapeRoutes from "./routes/scrapeRoutes.js";
import scrapeStories from "./services/scraper.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/scrape", scrapeRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await scrapeStories();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();

