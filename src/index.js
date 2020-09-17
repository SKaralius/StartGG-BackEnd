import express from "express";
import getTrendingYoutube from "./apiCalls/youtube.js";
import getTrendingReddit from "./apiCalls/reddit.js";

const app = express();
const port = process.env.PORT;

import NodeCache from "node-cache";
const cache = new NodeCache();

async function getData() {
  const redditData = await getTrendingReddit();
  // const youtubeData = await getTrendingYoutube();
  cache.set("reddit", redditData, 3600);
  // cache.set("youtube", youtubeData, 3600);
}
getData();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
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
  console.log(`Example app listening at http://${process.env.HOST}:${port}`);
});
