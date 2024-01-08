export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  email: string;
  externalId: string;
  address: string;
}

export type UserWithoutId = Omit<UserStructure, "_id">;
