import express from "express";
import cors from "cors";
import { initCache, mSetCache, getFromCache } from "./cache.js";
import getRedditPosts from "./apiCalls/reddit.js";
import { paginateArray } from "./util/functions.js";
import "./cron.js";

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
app.get("/reddit/subreddit/:subreddit/:pageNumber", async (req, res) => {
    const { subreddit, pageNumber } = req.params;
    res.statusCode = 200;
    res.set("Cache-Control", "public, max-age=3600");
    const data = getFromCache(`${subreddit}-${pageNumber}`);
    if (data == undefined) {
        const postData = await getRedditPosts(subreddit);
        const arrayOfArrays = paginateArray(postData);
        mSetCache([
            { key: `${subreddit}-0`, val: arrayOfArrays[0], tll: 3600 },
            { key: `${subreddit}-1`, val: arrayOfArrays[1], tll: 3600 },
            { key: `${subreddit}-2`, val: arrayOfArrays[2], tll: 3600 },
            { key: `${subreddit}-3`, val: arrayOfArrays[3], tll: 3600 },
        ]);
        res.json(arrayOfArrays[pageNumber]);
    } else {
        res.json(data);
    }
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
