import  express, { Router } from "express";
import LoginController from "../controllers/LoginController";

const loginController: LoginController = new LoginController();

const loginRouter: Router = express.Router();

loginRouter.post('/login', loginController.login);
loginRouter.delete('logout', loginController.logout);

export default loginRouter;