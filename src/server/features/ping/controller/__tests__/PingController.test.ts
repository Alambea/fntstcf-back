import { type NextFunction, type Request, type Response } from "express";
import PingController from "../PingController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a PingController class", () => {
  describe("When its method getPong is called with a next function", () => {
    const req: Partial<Request> = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next: NextFunction = jest.fn();

    test("Then it should call the received response's status method with a status code 200", () => {
      const expectedStatusCode = 200;
      const pingController = new PingController();

      pingController.getPong(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's json method with a message '🏓'", () => {
      const expectedMessage = { message: "🏓" };
      const pingController = new PingController();

      pingController.getPong(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
