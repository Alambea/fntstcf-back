import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../../CustomError/CustomError";
import { type UsersRepository } from "../../../user/repository/types";
import SyncController from "../SyncController";
import type UsersApiClient from "../../services/UsersApiClient";
import { ervinMock, usersMock } from "../../../user/mocks/usersMock";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Given a syncUsers controller", () => {
  const req: Partial<Request> = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a response and the users exists in the database", () => {
    const usersRepository: Pick<UsersRepository, "addUser" | "updateUser"> = {
      addUser: jest.fn().mockResolvedValue(undefined),
      updateUser: jest.fn().mockResolvedValue(usersMock[1]),
    };
    const usersApiClient: UsersApiClient = {
      getUsers: jest.fn().mockResolvedValue(usersMock),
    };
    const syncController = new SyncController(
      usersApiClient,
      usersRepository as UsersRepository,
    );

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;

      await syncController.syncUsers(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with the users 'Leanne Graham' and 'Ervin Howell'", async () => {
      const expectedUsers = {
        users: [
          { ...ervinMock, _id: "6597311f918836cd309acda5" },
          { ...ervinMock, _id: "6597311f918836cd309acda5" },
        ],
      };

      await syncController.syncUsers(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedUsers);
    });
  });

  describe("When it receives a response and the users doesn't exist in the database", () => {
    const usersRepository: Pick<UsersRepository, "addUser" | "updateUser"> = {
      addUser: jest.fn().mockResolvedValue(usersMock[1]),
      updateUser: jest.fn().mockResolvedValue(undefined),
    };
    const usersApiClient: UsersApiClient = {
      getUsers: jest.fn().mockResolvedValue(usersMock),
    };
    const syncController = new SyncController(
      usersApiClient,
      usersRepository as UsersRepository,
    );

    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatusCode = 200;

      await syncController.syncUsers(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with the users 'Leanne Graham' and 'Ervin Howell'", async () => {
      const expectedUsers = {
        users: [
          { ...ervinMock, _id: "6597311f918836cd309acda5" },
          { ...ervinMock, _id: "6597311f918836cd309acda5" },
        ],
      };

      await syncController.syncUsers(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedUsers);
    });
  });

  describe("When an error is thrown and it receives a response and a next function", () => {
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
