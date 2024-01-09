import { Joi, validate } from "express-validation";
import { type UserWithoutId } from "../../types";

const userSchema = {
  body: Joi.object<UserWithoutId>({
    name: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    address: Joi.string().required(),
  }),
};

const userValidation = validate(userSchema, {}, { abortEarly: false });

export default userValidation;
