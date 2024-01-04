import { type UserStructure } from "../../types";

export interface UsersRepository {
  getUsers(): Promise<UserStructure[]>;
}
