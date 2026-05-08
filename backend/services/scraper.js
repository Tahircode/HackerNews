
import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

const HN_URL = process.env.HN_URL;

const scrapeStories = async () => {
  const { data } = await axios.get(process.env.HN_URL);
  const $ = cheerio.load(data);

  const stories = [];

  $(".athing").slice(0, 10).each((i, el) => {
    const id = $(el).attr("id");
    const titleEl = $(el).find(".titleline > a").first();
    const title = titleEl.text().trim();
    const url = titleEl.attr("href");

    const subtext = $(el).next(".spacer").find(".subtext") ||
                    $(`#score_${id}`).closest(".subtext");

    const metaRow = $(el).next();
    const points = parseInt(metaRow.find(`#score_${id}`).text()) || 0;
    const author = metaRow.find(".hnuser").text().trim();
    const postedAt = metaRow.find(".age").attr("title") || 
                     metaRow.find(".age a").text().trim();

    if (id && title && url) {
      stories.push({ hnId: id, title, url, points, author, postedAt });
    }
  });

  const results = await Promise.all(
    stories.map((story) =>
      Story.findOneAndUpdate(
        { hnId: story.hnId },
        { ...story, scrapedAt: new Date() },
        { upsert: true, returnDocument: "after" }
      )
    )
  );

  console.log(`Scraped and saved ${results.length} stories`);
  return results;
};

export default scrapeStories;



