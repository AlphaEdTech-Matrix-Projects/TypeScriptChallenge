import { IUser } from "../interfaces/interfaces";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import { ForbiddenException, UnauthorizedException } from "../utils/Exception";
import AuthorizedNeed from "../utils/AuthorizedNeed";
import { Message } from "../utils/Message";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getMyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      res.status(200).json(req.authUser);
    } catch (error) {
      next(error);
    }
  }

  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);
      const user = req.authUser;
      if (!user.isAdmin) {
        throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
      }

      const usersList = await this.userService.getAllUsers();

      res.status(200).send(usersList);
    } catch (error) {
      next(error);
    }
  }

  public async getUserId(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {}
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {}
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {}
  }

  public async deleteuser(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {}
  }
}
