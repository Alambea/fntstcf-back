import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../../CustomError/CustomError";
import { type UsersRepository } from "../../../user/repository/types";
import SyncController from "../SyncController";
import type UsersApiClient from "../../services/UsersApiClient";

describe("Given a syncUsers controller", () => {
  describe("When an error is thrown and it receives a response and a next function", () => {
    const req: Partial<Request> = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next: NextFunction = jest.fn();
    test("Then it should call the received next function with status 500 and public message 'Error on synchronize users'", async () => {
      const rejectionError = new Error("Error on synchronize users");
      const expectedError = new CustomError(
        `Error: ${rejectionError.message}`,
        500,
      );

      const usersApiClient: UsersApiClient = {
        getUsers: jest.fn().mockRejectedValue(rejectionError),
      };
      const usersRepository: Pick<UsersRepository, "updateUser" | "getUsers"> =
        {
          updateUser: jest.fn().mockRejectedValue(rejectionError),
          getUsers: jest.fn(),
        };

      const syncController = new SyncController(
        usersApiClient,
        usersRepository as UsersRepository,
      );

      await syncController.syncUsers(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
