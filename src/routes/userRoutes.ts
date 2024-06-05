import express, { Router } from "express";
import UserController from "../controllers/UserController";

const userController: UserController = new UserController();

const userRouter: Router = express.Router();

userRouter.get("/me", userController.getMyUser.bind(userController));
userRouter.get("/", userController.getAllUsers.bind(userController));
userRouter.get("/:user_id", userController.getUserId.bind(userController));
userRouter.post("/", userController.createUser.bind(userController));
userRouter.patch("/:user_id", userController.updateUser.bind(userController));
userRouter.delete("/:user_id", userController.deleteuser.bind(userController));

export default userRouter;
