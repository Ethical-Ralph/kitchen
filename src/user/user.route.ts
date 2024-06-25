import express from "express";
import { UserRepo } from "./repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { handleAsyncError } from "../utils";

const userRouter = express.Router();

const userRepo = new UserRepo();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

userRouter.post(
  "/register",
  handleAsyncError(userController.registerUser.bind(userController))
);

userRouter.post(
  "/login",
  handleAsyncError(userController.login.bind(userController))
);

export { userRouter };
