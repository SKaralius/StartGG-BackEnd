import fetch from "node-fetch";

export default async function getTrendingReddit() {
  console.log("request to reddit");
  const response = await fetch("https://www.reddit.com/.json");
  const data = await response.json();
  return data;
}
