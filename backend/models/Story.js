const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
    points: {
      type: Number,
      required: [true, "Points are required"],
      default: 0,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    postedAt: {
      type: String, 
      required: [true, "Posted time is required"],
    },
    hnId: {
      type: String,
      unique: true, 
      required: [true, "HackerNews story ID is required"],
    },
    scrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

storySchema.index({ points: -1 }); 

module.exports = mongoose.model("Story", storySchema);