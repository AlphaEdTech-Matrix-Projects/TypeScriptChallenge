import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { Message } from "../utils/Message";
import AuthService from "../services/AuthService";
import AuthorizedNeed from "../utils/AuthorizedNeed";

const LoginDto = z.object({
  username: z.string({ message: "Usuário obrigatório" }),
  password: z.string({ message: "Senha é obrigatória" }),
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

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      res.clearCookie("token");

      res.status(200).json({ message: Message.LOGOUT_SUCCESS });
    } catch (error) {
      next(error);
    }
  }
}
