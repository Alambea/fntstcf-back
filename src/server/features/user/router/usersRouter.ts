import { Router } from "express";
import UsersController from "../controller/UsersController.js";
import UsersMongooseRepository from "../repository/UsersMongooseRepository.js";
import userValidation from "../schema/userSchema.js";

const usersRouter = Router();

const usersRepository = new UsersMongooseRepository();
const usersController = new UsersController(usersRepository);

usersRouter.get("/", usersController.getUsers);
usersRouter.put("/", userValidation, usersController.addUser);

export default usersRouter;
