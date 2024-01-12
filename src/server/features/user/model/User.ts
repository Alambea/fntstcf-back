import { Schema, model } from "mongoose";
import { type UserStructure } from "../../types";

const UserSchema = new Schema<UserStructure>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  external_id: {
    type: String,
    required: false,
    sparse: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema, "users");

export default User;
