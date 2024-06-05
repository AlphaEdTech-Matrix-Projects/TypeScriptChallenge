import { IUser } from "../interfaces/interfaces";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import { ForbiddenException, UnauthorizedException } from "../utils/Exception";
import AuthorizedNeed from "../utils/AuthorizedNeed";
import { Message } from "../utils/Message";
import HttpResponse from "../utils/HttpResponse";
import { z } from "zod";
import TeamService from "../services/TeamService";

const validate = z.object({
  username: z.string().min(1, { message: "Usuário obrigatório" }),
  firstName: z.string().min(1, { message: "Nome obrigatório" }),
  lastName: z.string().min(1, { message: "Sobrenome obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Senha obrigatória" })
});

export default class UserController {
  private userService: UserService;
  private teamService: TeamService;

  constructor() {
    this.userService = new UserService();
    this.teamService = new TeamService();
  }

  public async getMyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const response = new HttpResponse({
        status: 200,
        data: req.authUser
      });

      res.status(response.status).json(response);
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

      const response = new HttpResponse({
        status: 200,
        data: usersList
      })

      res.status(response.status).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      AuthorizedNeed(req);
      const id = req.params.user_id;
      const user = await this.userService.getUserById(id);

      const userLoged = req.authUser;
      if (userLoged.isAdmin !== true) {
        throw new UnauthorizedException(Message.UNAUTHORIZED_ACCESS);
      }

      const response = new HttpResponse({
        status: 200,
        data: user as IUser
      });

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, firstName, lastName, email, password } = validate.parse(req.body);
      
      const user: IUser = req.body;
      const result = await this.userService.createUser(user);

      const response = new HttpResponse({
        status: 201,
        data: result
      })

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      AuthorizedNeed(req);
      const validatePartial = validate.partial();
      const { username, firstName, lastName, email, password } = validatePartial.parse(req.body);
      const fiels: Partial<IUser> = req.body;

      const id = req.params.user_id;
      
      const user = req.authUser;
      
      const result = await this.userService.updateUserById(id, fiels, user);

      res.json(result)
    } catch (error) {
      next(error);
    }
  }

  public async deleteuser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      AuthorizedNeed(req);
      const id = req.params.user_id;
      const logedUser = req.authUser;
      const result = await this.userService.deleteUserById(id, logedUser);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
