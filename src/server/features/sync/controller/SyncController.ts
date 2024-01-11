import "dotenv/config";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { type UsersRepository } from "../../user/repository/types.js";
import { type UsersApiClientStructure } from "../services/types.js";

class SyncController {
  constructor(
    private readonly usersApiClient: UsersApiClientStructure,
    private readonly usersRepository: UsersRepository,
  ) {}

  syncUsers = async (_req: Request, res: Response, next: NextFunction) => {
    const users = new Array(0);

    try {
      const apiUsers = await this.usersApiClient.getUsers();

      for await (const apiUser of apiUsers) {
        const updatedUser = await this.usersRepository.updateUser(apiUser);

        if (!updatedUser) {
          const newUser = await this.usersRepository.addUser(apiUser);

          users.push(newUser);
          continue;
        }

        users.push(updatedUser);
      }

      res.status(200).json({ users });
    } catch (error: unknown) {
      const customError = new CustomError(
        `Error: ${(error as Error).message}`,
        500,
        "Error on synchronize users",
      );

      next(customError);
    }
  };
}

export default SyncController;
