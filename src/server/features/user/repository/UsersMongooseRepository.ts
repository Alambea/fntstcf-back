import { type UserStructure, type UserWithoutId } from "../../types";
import User from "../model/User.js";
import { type UsersRepository } from "./types";

class UsersMongooseRepository implements UsersRepository {
  public async getUsers(): Promise<UserStructure[]> {
    const users = await User.find();

    return users;
  }

  public async addUser(user: UserWithoutId): Promise<UserStructure> {
    const newUser = await User.create({ ...user });

    return newUser;
  }
}

export default UsersMongooseRepository;
