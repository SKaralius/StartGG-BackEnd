import express from "express";
import cors from "cors";
import { initCache, getFromCache } from "./cache.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
const port = process.env.PORT;

initCache();

app.get("/reddit/:pageNumber", (req, res) => {
  res.statusCode = 200;
  res.set("Cache-Control", "public, max-age=3600");
  const data = getFromCache(`reddit-${req.params.pageNumber}`);
  res.json(data);
});
app.get("/youtube/:pageNumber", (req, res) => {
  res.statusCode = 200;
  res.set("Cache-Control", "public, max-age=3600");
  const data = getFromCache(`youtube-${req.params.pageNumber}`);
  res.json(data);
});

app.listen(port, () => {
  console.log(`App listening at http://${process.env.HOST}:${port}`);
});
