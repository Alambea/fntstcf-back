import { type UserWithoutId, type UserStructure } from "../../types";

export interface UsersRepository {
  getUsers(): Promise<UserStructure[]>;
  addUser(user: UserWithoutId): Promise<UserStructure>;
}
