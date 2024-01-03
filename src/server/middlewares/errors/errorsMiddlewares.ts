import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../CustomError/CustomError.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("users:middlewares:errors");

export const generalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.publicMessage ?? "Internal server error";

  debug(chalk.red(`Error: ${error.message}`));

  res.status(statusCode).json({ error: publicMessage });
};
