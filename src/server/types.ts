import { type Request } from "express";
import { type UserWithoutId } from "./features/types";

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserWithoutId
>;
