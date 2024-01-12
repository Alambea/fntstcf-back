export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  email: string;
  external_id?: string;
  address: string;
}

export type UserWithoutId = Omit<UserStructure, "_id">;
