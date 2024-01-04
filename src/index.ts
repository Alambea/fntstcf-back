import "dotenv/config";
import { startServer } from "./server/app.js";
import debugCreator from "debug";
import chalk from "chalk";
import connectToDatabase from "./database/index.js";
import "./server/index.js";

const debug = debugCreator("users:initialize");

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL!;

try {
  await connectToDatabase(mongoDbUrl);

  startServer(+port);
} catch (error) {
  debug(chalk.red("Error connecting to database"));
  debug(chalk.red(error.message));
  process.exit(1);
}
