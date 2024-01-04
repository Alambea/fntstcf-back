import chalk from "chalk";
import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("users:database");

const connectToDatabase = async (mongoUrl: string) => {
  await mongoose.connect(mongoUrl);

  debug(chalk.green("Connected to database."));
};

export default connectToDatabase;
