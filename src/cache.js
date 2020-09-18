import NodeCache from "node-cache";

import getTrendingYoutube from "./apiCalls/youtube.js";
import getTrendingReddit from "./apiCalls/reddit.js";

const cache = new NodeCache();
const postsPerPage = 25;

export default function initCache() {
  // Gets data initialy.
  getData();
  return cache;
}

async function getData() {
  // TODO: Requests don't start simultaneously
  const youtubeData = await getTrendingYoutube();
  // Returns array with 100 posts
  const redditData = await getTrendingReddit();

  const paginatedArray = paginateArray(redditData);

  //  // Returns null when trying to retrieve key from cache refereces? scope?
  //   paginatedArray.forEach((page, index) => {
  //     cacheObjects.push({
  //       key: `reddit-${index}`,
  //       value: "hello world",
  //     });
  //   });

  // No TTL for cache, because data should only expire
  // When it is replaced by cron
  cache.mset([
    { key: "reddit-0", val: paginatedArray[0] },
    { key: "reddit-1", val: paginatedArray[1] },
    { key: "reddit-2", val: paginatedArray[2] },
    { key: "reddit-3", val: paginatedArray[3] },
    { key: "youtube", val: youtubeData },
  ]);
}

function paginateArray(arr) {
  const numberOfNewArrays = arr.length / postsPerPage;
  const arrays = [];
  for (let i = 1; i <= numberOfNewArrays; i++) {
    arrays.push(arr.slice(i * postsPerPage - 25, i * postsPerPage));
  }
  return arrays;
}
