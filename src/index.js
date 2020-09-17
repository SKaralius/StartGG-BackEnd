import express from "express";
import NodeCache from "node-cache";
import cron from "node-cron";
import cors from "cors";

import getTrendingYoutube from "./apiCalls/youtube.js";
import getTrendingReddit from "./apiCalls/reddit.js";

const app = express();
app.use(
  cors({
    origin: `http://${process.env.FRONT_END_HOST}:${process.env.FRONT_END_PORT}`,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
const port = process.env.PORT;

const cache = new NodeCache();

async function getData() {
  // TODO: Requests don't start simultaneously
  const youtubeData = await getTrendingYoutube();
  const redditData = await getTrendingReddit();
  // No TTL for cache, because data should only expire
  // When it is replaced by cron
  cache.mset([
    { key: "reddit", val: redditData },
    { key: "youtube", val: youtubeData },
  ]);
}
// Gets data every 59th minute
// In other words, once an hour.
cron.schedule("* * * * *", () => {
  console.log("Refreshing data");
  getData();
});
// Gets data initialy.
getData();

// app.get("/", (req, res) => {
//   cache.set("reddit", "another value");
//   res.json(cache.get("reddit"));
// });
app.get("/reddit", (req, res) => {
  res.statusCode = 200;
  res.set("Cache-Control", "public, max-age=3600");
  res.json(cache.get("reddit"));
});
app.get("/youtube", (req, res) => {
  res.statusCode = 200;
  res.set("Cache-Control", "public, max-age=3600");
  res.json(cache.get("youtube"));
});

app.listen(port, () => {
  console.log(`App listening at http://${process.env.HOST}:${port}`);
});
