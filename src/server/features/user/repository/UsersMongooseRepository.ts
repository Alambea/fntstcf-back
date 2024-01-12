import { type FilterQuery, type QueryOptions } from "mongoose";
import { type UserStructure, type UserWithoutId } from "../../types";
import User from "../model/User.js";
import { type UsersRepository } from "./types";

class UsersMongooseRepository implements UsersRepository {
  public async getUsers(): Promise<UserStructure[]> {
    const users = await User.find();

    return users;
  }

  public async addUser(
    user: UserStructure | UserWithoutId,
  ): Promise<UserStructure> {
    const newUser = await User.create(user);

    return newUser;
  }

  public async updateUser(user: UserWithoutId): Promise<UserStructure | void> {
    const filter: FilterQuery<any> = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      external_id: user.external_id,
    };
    const options: QueryOptions = {
      returnDocument: "after",
    };

    const updatedUser = await User.findOneAndUpdate(filter, user, options);

    if (updatedUser) {
      return updatedUser;
    }
  }
}

export default UsersMongooseRepository;
