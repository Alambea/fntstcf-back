import { type NextFunction, type Request, type Response } from "express";
import { type UsersRepository } from "../../repository/types";
import { leanneMock, usersMock } from "../../mocks/usersMock";
import UsersController from "../UsersController";
import CustomError from "../../../../CustomError/CustomError";
import { type CustomRequest } from "../../../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a UsersController's class addUser method", () => {
  const req: Partial<Request> = { body: leanneMock };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next: NextFunction = jest.fn();

  describe(`When it receives a request with a user '${leanneMock.name}' and a response`, () => {
    const usersRepository: Pick<UsersRepository, "addUser"> = {
      addUser: jest.fn().mockResolvedValue(usersMock[0]),
    };

    const usersController = new UsersController(
      usersRepository as UsersRepository,
    );

    test("Then it should call the received response's method status with 201", async () => {
      const expectedStatusCode = 201;

      await usersController.addUser(
        req as CustomRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test(`Then it should call the received response's method json with the user '${leanneMock.name}'`, async () => {
      const expectedUsers = { user: usersMock[0] };

      await usersController.addUser(
        req as CustomRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedUsers);
    });
  });

  describe("When it receives a response and a next function and an error is thrown", () => {
    test("Then it should call the received next function with an error with status 500 and a message 'Failed adding user'", async () => {
      const rejectionError = new Error("Failed to add users");
      const expectedError = new CustomError(
        `Error adding user: ${rejectionError.message}`,
        500,
        "Failed to add user",
      );

      const usersRepository: Pick<UsersRepository, "addUser"> = {
        addUser: jest.fn().mockRejectedValue(rejectionError),
      };

      const usersController = new UsersController(
        usersRepository as UsersRepository,
      );

      await usersController.addUser(
        req as CustomRequest,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
