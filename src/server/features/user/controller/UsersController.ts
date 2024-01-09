import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { type UsersRepository } from "../repository/types.js";
import { type CustomRequest } from "../../../types.js";

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

  addUser = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const user = req.body;

    try {
      const newUser = await this.usersRepository.addUser(user);

      res.status(201).json({ user: newUser });
    } catch (error: unknown) {
      const customError = new CustomError(
        `Error adding user: ${(error as Error).message}`,
        400,
        "Failed to add user",
      );

      next(customError);
    }
  };
}

export default UsersController;
