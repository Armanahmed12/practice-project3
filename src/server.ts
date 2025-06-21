import app from "./app";
import config from "./config";
// getting-started.js
import mongoose from "mongoose";

console.log("hello");
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
