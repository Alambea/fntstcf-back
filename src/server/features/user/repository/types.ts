import { type UserWithoutId, type UserStructure } from "../../types";

export interface UsersRepository {
  getUsers(): Promise<UserStructure[]>;
  addUser(user: UserWithoutId | UserStructure): Promise<UserStructure>;
  updateUser(user: UserWithoutId): Promise<UserStructure | void>;
}
