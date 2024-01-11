import { type UserWithoutId } from "../../types";

export interface UsersApiClientStructure {
  getUsers(): Promise<UserWithoutId[]>;
}
