import googleApi from "googleapis";

export default async function getTrendingYoutube() {
  const googleService = googleApi.google.youtube("v3");
  console.log("request to google");
  // Requests youtube for 25 trending videos.
  const response = await googleService.videos.list({
    part: "snippet, contentDetails",
    chart: "mostPopular",
    regionCode: "US",
    maxResults: 25,
    key: process.env.YOUTUBE_API_KEY,
  });
  // Removes unnecessary information
  const videos = [];
  response.data.items.forEach((item) => {
    const videoItem = {};
    videoItem.id = item.id;
    videoItem.snippet = {
      publishedAt: item.snippet.publishedAt,
      title: item.snippet.title,
      thumbnails: item.snippet.thumbnails,
      channelTitle: item.snippet.channelTitle,
    };
    videoItem.contentDetails = {
      duration: item.contentDetails.duration,
    };
    videos.push(videoItem);
  });
  return videos;
}
