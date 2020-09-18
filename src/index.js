import express from "express";
import cron from "node-cron";
import cors from "cors";
import initCache from "./cache.js";

const app = express();
app.use(
  cors({
    origin: `http://${process.env.FRONT_END_HOST}:${process.env.FRONT_END_PORT}`,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
const port = process.env.PORT;

const cache = initCache();

// Gets data every 59th minute
// In other words, once an hour.
// cron.schedule("59 * * * *", () => {
//   console.log("Refreshing data");
//   getData();
// });

// app.get("/", (req, res) => {
//   cache.set("reddit", "another value");
//   res.json(cache.get("reddit"));
// });
app.get("/reddit/:pageNumber", (req, res) => {
  res.statusCode = 200;
  res.set("Cache-Control", "public, max-age=3600");
  const data = cache.get(`reddit-${req.params.pageNumber}`);
  res.json(data);
});
app.get("/youtube/:pageNumber", (req, res) => {
  res.statusCode = 200;
  res.set("Cache-Control", "public, max-age=3600");
  const data = cache.get(`youtube-${req.params.pageNumber}`);
  res.json(data);
});

app.listen(port, () => {
  console.log(`App listening at http://${process.env.HOST}:${port}`);
});
