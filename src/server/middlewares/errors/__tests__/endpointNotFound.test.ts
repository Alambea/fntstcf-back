import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { endpointNotFound } from "../errorsMiddlewares";

describe("Given a endpointNotFound middleware", () => {
  describe("When it receives a request, response and a next function", () => {
    test("Then it should call the received next function with a custom error with a public and private 'Endpoint not found' messages and a status code 404", () => {
      const expectedCustomError = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found",
      );
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const req: Partial<Request> = {};
      const next: NextFunction = jest.fn();

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
