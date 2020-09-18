import getTrendingYoutube from "../apiCalls/youtube.js";
import getTrendingReddit from "../apiCalls/reddit.js";
import { mSetCache } from "../cache.js";

const postsPerPage = 25;

export default async function getData() {
  // TODO: Requests don't start simultaneously
  const youtubeData = await getTrendingYoutube();
  // Returns array with 100 posts
  const redditData = await getTrendingReddit();

  const paginatedRedditArray = paginateArray(redditData);
  const paginatedYoutubeArray = paginateArray(youtubeData);

  //  // Returns null when trying to retrieve key from cache refereces? scope?
  //   paginatedRedditArray.forEach((page, index) => {
  //     cacheObjects.push({
  //       key: `reddit-${index}`,
  //       value: "hello world",
  //     });
  //   });

  // No TTL for cache, because data should only expire
  // When it is replaced by cron
  mSetCache([
    { key: "reddit-0", val: paginatedRedditArray[0] },
    { key: "reddit-1", val: paginatedRedditArray[1] },
    { key: "reddit-2", val: paginatedRedditArray[2] },
    { key: "reddit-3", val: paginatedRedditArray[3] },
    { key: "youtube-0", val: paginatedYoutubeArray[0] },
    { key: "youtube-1", val: paginatedYoutubeArray[1] },
    { key: "youtube-2", val: paginatedYoutubeArray[2] },
    { key: "youtube-3", val: paginatedYoutubeArray[3] },
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
