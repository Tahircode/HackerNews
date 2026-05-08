import scrapeStories from "../services/scraper.js";

export const triggerScrape = async (req, res) => {
  try {
    const stories = await scrapeStories();
    res.status(200).json({
      success: true,
      message: `Successfully scraped ${stories.length} stories`,
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Scraping failed",
      error: error.message,
    });
  }
};



