import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connectdb() {
  const dbUri = config.get("dbUri") as string;
  try {
    await mongoose.connect(dbUri);
    logger.info("Database connected");
  } catch (error) {
    logger.error("could not connect to db", error);
    process.exit(1);
  }
}

export default connectdb;
