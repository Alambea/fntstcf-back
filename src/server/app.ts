import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import express from "express";

const debug = debugCreator("users:initialize");

const app = express();

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.blue(`Listening on http://localhost:${port}`));
  });
};

export default app;
