import express from "express";
import cors from "cors";
import config from "config";
import connectdb from "./utils/connectdb";
import logger from "./utils/logger";
import routes from "./routes";
import { deserializeUser } from "./middleware/deserializeUser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(deserializeUser);

const port = config.get("port") as number;
const host = config.get("host") as string;
app.listen(port, async () => {
  logger.info(`Server is running on ${host}:${port}`);
  await connectdb();
  routes(app);
});
