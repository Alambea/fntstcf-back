import { Router } from "express";
import UsersMongooseRepository from "../../user/repository/UsersMongooseRepository.js";
import SyncController from "../controller/SyncController.js";
import UsersApiClient from "../services/UsersApiClient.js";

const syncRouter = Router();

const usersApiClient = new UsersApiClient();

const usersRespository = new UsersMongooseRepository();
const syncController = new SyncController(usersApiClient, usersRespository);

syncRouter.post("/", syncController.syncUsers);

export default syncRouter;
