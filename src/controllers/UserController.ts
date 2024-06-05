import { IUser } from "../interfaces/interfaces";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import { UnauthorizedException } from "../utils/Exception";
import AuthorizedNeed from "../utils/AuthorizedNeed";

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

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {}
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
