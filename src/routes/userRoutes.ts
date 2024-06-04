import  express, { Router } from "express";
import UserController from "../controllers/UserController";

const userController: UserController = new UserController();

const userRouter: Router = express.Router();

userRouter.get('/me', userController.getMyUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:user_id', userController.getUserId);
userRouter.post('/', userController.createUser);
userRouter.patch('/:user_id', userController.updateUser);
userRouter.delete('/:user_id', userController.deleteuser);

export default userRouter;