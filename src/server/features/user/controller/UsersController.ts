import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { type UsersRepository } from "../repository/types.js";

class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.usersRepository.getUsers();

      res.status(200).json({ users });
    } catch (error: unknown) {
      const customError = new CustomError(
        `Error in getting users: ${(error as Error).message}`,
        400,
        "Failed to get users",
      );

      next(customError);
    }
  };
}

export default UsersController;
