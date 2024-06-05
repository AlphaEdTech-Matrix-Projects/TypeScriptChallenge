import { NextFunction, Request, Response } from "express";
import TeamService from "../services/TeamService";
import AuthorizedNeed from "../utils/AuthorizedNeed";
import { z } from "zod";

const UuidParse = z
  .string({ message: "ID precisa ser uma string" })
  .uuid({ message: "ID precisa ser um UUID válido" });

const CreateTeamDto = z.object({
  name: z.string(),
  leaderId: z
    .string({ message: "LeaderId precisa ser uma string" })
    .uuid({ message: "LeaderId precisa ser um UUID válido" }),
});
export type CreateTeamDto = z.infer<typeof CreateTeamDto>;

const UpdateTeamDto = z.object({
  name: z.string({ message: "Nome do time precisa ser uma string" }).optional(),
  leaderId: z
    .string({ message: "LeaderId precisa ser uma string" })
    .uuid({ message: "LeaderId precisa ser um UUID válido" })
    .optional(),
});
export type UpdateTeamDto = z.infer<typeof UpdateTeamDto>;

export default class TeamsController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public async getTeams(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const user = req.authUser;

      res.status(200).json(await this.teamService.getAll(user));
    } catch (error) {
      next(error);
    }
  }

  public async getTeamId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const uuid = UuidParse.parse(req.params["team_id"]);

      const user = req.authUser;

      res.status(200).json(await this.teamService.getById(user, uuid));
    } catch (error) {
      next(error);
    }
  }

  public async getMembersTeam(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const uuid = UuidParse.parse(req.params["team_id"]);

      const user = req.authUser;

      res.status(200).json(await this.teamService.getMembers(user, uuid));
    } catch (error) {
      next(error);
    }
  }

  public async createTeam(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const user = req.authUser;

      const data = CreateTeamDto.parse(req.body);

      res.status(201).json(await this.teamService.create(user, data));
    } catch (error) {
      next(error);
    }
  }

  public async addMemberTeam(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const user = req.authUser;

      const team_id = UuidParse.parse(req.params["team_id"]);
      const user_id = UuidParse.parse(req.params["user_id"]);

      res
        .status(200)
        .json(await this.teamService.addMember(user, team_id, user_id));
    } catch (error) {
      next(error);
    }
  }

  public async removeMemberTeam(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const user = req.authUser;

      const team_id = UuidParse.parse(req.params["team_id"]);
      const user_id = UuidParse.parse(req.params["user_id"]);

      res
        .status(200)
        .json(await this.teamService.removeMember(user, team_id, user_id));
    } catch (error) {
      next(error);
    }
  }

  public async updateTeam(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const user = req.authUser;

      const team_id = UuidParse.parse(req.params["team_id"]);

      const data = UpdateTeamDto.parse(req.body);

      res.status(200).json(await this.teamService.update(user, team_id, data));
    } catch (error) {
      next(error);
    }
  }

  public async deleteTeam(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      AuthorizedNeed(req);

      const user = req.authUser;

      const team_id = UuidParse.parse(req.params["team_id"]);

      res.status(200).json(await this.teamService.delete(user, team_id));
    } catch (error) {
      next(error);
    }
  }
}
