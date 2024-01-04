import { type UserStructure } from "../../types";
import User from "../model/User.js";
import { type UsersRepository } from "./types";

class UsersMongooseRepository implements UsersRepository {
  public async getUsers(): Promise<UserStructure[]> {
    const users = await User.find();

    return users;
  }
}

export default UsersMongooseRepository;
