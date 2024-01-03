import { type Request, type NextFunction, type Response } from "express";
import { generalErrorHandler } from "../errorsMiddlewares";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalErrorHandler middleware", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const req: Partial<Request> = {};
  const next: NextFunction = jest.fn();

  describe("When it receives response and an error with status code 400 and message 'Couldn't add user'", () => {
    const error = new CustomError(
      "Private message error",
      400,
      "Public message error",
    );

    test("Then it should call the response's method status with 400", () => {
      const expectedStatusCode = error.statusCode;

      generalErrorHandler(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with the error 'Couldn't add user'", () => {
      const expectedErrorMessage = { error: error.publicMessage };

      generalErrorHandler(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });

  describe("When it receives response and an error without status code and public message", () => {
    const error = new Error("Private message error");

    test("Then it should call the response's method status with 500", () => {
      const expectedStatusCode = 500;

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with the error 'Internal server error'", () => {
      const expectedErrorMessage = { error: "Internal server error" };

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
