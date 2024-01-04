import { type NextFunction, type Request, type Response } from "express";
import { type UsersRepository } from "../../repository/types";
import { usersMock } from "../../mocks/usersMock";
import UsersController from "../UsersController";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a  UsersController's class getUsers method", () => {
  const req: Partial<Request> = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a response", () => {
    const usersRepository: UsersRepository = {
      getUsers: jest.fn().mockResolvedValue(usersMock),
    };

    const usersController = new UsersController(usersRepository);

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;

      await usersController.getUsers(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with the users 'Leanne Graham' and 'Ervin Howell'", async () => {
      const expectedUsers = { users: usersMock };

      await usersController.getUsers(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedUsers);
    });
  });

  describe("When it receives a response and a next function and an error is thrown", () => {
    test("Then it should call the received next function with an error with status 500 and a message 'Failed to get users'", async () => {
      const rejectionError = new Error("Failed to get users");
      const expectedError = new CustomError(
        `Error in getting users: ${rejectionError.message}`,
        500,
        "Failed to get users",
      );

      const usersRepository: UsersRepository = {
        getUsers: jest.fn().mockRejectedValue(rejectionError),
      };

      const usersController = new UsersController(usersRepository);

      await usersController.getUsers(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
