import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import debugCreator from "debug";
import chalk from "chalk";
import { ValidationError } from "express-validation";

const debug = debugCreator("users:middlewares:errors");

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const customError = new CustomError(
    "Endpoint not found",
    404,
    "Endpoint not found",
  );

  next(customError);
};

export const generalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ValidationError && error.details.body) {
    const validationError = error.details.body
      .map((joiError) => joiError.message.replaceAll('"', ""))
      .join(" & ");

    (error as CustomError).publicMessage = validationError;
    (error as CustomError).message = validationError;
  }

  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.publicMessage ?? "Internal server error";

  debug(chalk.red(`Error: ${error.message}`));

  res.status(statusCode).json({ error: publicMessage });
};
