import cron from "node-cron";
import getData from "./util/functions.js";

// Gets data every 59th minute
// In other words, once an hour.
cron.schedule("59 * * * *", () => {
  console.log("Refreshing data");
  getData();
});
