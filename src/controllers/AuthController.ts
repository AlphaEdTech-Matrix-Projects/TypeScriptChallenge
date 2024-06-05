import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import UserService from "../services/UserService";
import { UsernameOrPasswordIncorrectException } from "../utils/Exception";
import { Message } from "../utils/Message";
import BcryptService from "../services/BcryptService";
import AuthService from "../services/AuthService";

const LoginDto = z.object({
  username: z.string(),
  password: z.string(),
});

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username, password } = LoginDto.parse(req.body);

      const token = await this.authService.login(username, password);

      res.cookie("token", token);

      res.status(200).json({ message: Message.LOGIN_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {}
  }
}
