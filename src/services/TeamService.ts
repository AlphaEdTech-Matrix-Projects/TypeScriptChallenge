import { CreateTeamDto, UpdateTeamDto } from "../controllers/TeamsController";
import { ISquad, IUser } from "../interfaces/interfaces";
import TeamRepository from "../repositories/TeamRepository";
import UserRepository from "../repositories/UserRepository";
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "../utils/Exception";
import { Message } from "../utils/Message";

export default class TeamService {
  private teamRepository: TeamRepository;
  private userRepository: UserRepository;

  constructor() {
    this.teamRepository = new TeamRepository();
    this.userRepository = new UserRepository();
  }

  public async getById(user: IUser, id: string): Promise<ISquad> {
    const teamLeader = await this.teamRepository.getByLeaderId(id);

    if (!user.isAdmin && !teamLeader && user.squadId !== id) {
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
    }

    const team = await this.teamRepository.getById(id);

    if (!team) {
      throw new NotFoundException(Message.TEAM_NOT_FOUND);
    }

    return team;
  }

  public async getAll(user: IUser): Promise<ISquad[]> {
    const teamLeader = await this.teamRepository.getByLeaderId(user.id);

    if (!user.isAdmin && !teamLeader) {
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
    }

    const teams = await this.teamRepository.getAll();

    return teams;
  }

  public async getMembers(user: IUser, id: string): Promise<IUser[]> {
    if (!user.isAdmin && user.squadId !== id) {
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
    }

    const teams = await this.teamRepository.getMembers(id);

    return teams;
  }

  public async create(user: IUser, data: CreateTeamDto): Promise<ISquad> {
    if (!user.isAdmin) {
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
    }

    if (user.id === data.leaderId) {
      throw new ForbiddenException(Message.ADMIN_CANNOT_JOIN_TEAM);
    }

    const userData = await this.userRepository.getUserById(data.leaderId);

    if (!userData) {
      throw new NotFoundException(Message.USER_NOT_FOUND);
    }

    if (userData.squadId !== null) {
      throw new ConflictException(Message.USER_ALREADY_TEAM);
    }

    const userAlreadyTeam = await this.teamRepository.getByLeaderId(
      data.leaderId
    );

    if (userAlreadyTeam) {
      throw new ConflictException(Message.USER_ALREADY_LEADER);
    }

    const createdTeam = await this.teamRepository.create(data);

    await this.teamRepository.addMember(userData.id, createdTeam.id);

    return createdTeam;
  }

  public async addMember(
    user: IUser,
    team_id: string,
    user_id: string
  ): Promise<IUser> {
    const team = await this.teamRepository.getById(team_id);

    if (!team) {
      throw new NotFoundException(Message.TEAM_NOT_FOUND);
    }

    if (!user.isAdmin && team.leaderId !== user.id) {
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
    }

    if (user.isAdmin && user.id === user_id) {
      throw new ConflictException(Message.USER_IS_ADMIN);
    }

    const userToAdd = await this.userRepository.getUserById(user_id);

    if (!userToAdd) {
      throw new NotFoundException(Message.USER_NOT_FOUND);
    }

    if (userToAdd.squadId !== null) {
      throw new ConflictException(Message.USER_ALREADY_TEAM);
    }

    const members = await this.teamRepository.getMembers(team_id);

    if (members.length >= 5) {
      throw new ConflictException(Message.TEAM_MAX_SIZE);
    }

    const userUpdated = await this.teamRepository.addMember(
      userToAdd.id,
      team.id
    );

    if (!userUpdated) {
      throw new Error(Message.FAILED_ADD_MEMBER);
    }

    return userUpdated;
  }

  public async removeMember(
    user: IUser,
    team_id: string,
    user_id: string
  ): Promise<IUser> {
    const team = await this.teamRepository.getById(team_id);

    if (!team) {
      throw new NotFoundException(Message.TEAM_NOT_FOUND);
    }

    if (!user.isAdmin && team.leaderId !== user.id) {
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
    }

    if (team.leaderId === user_id) {
      throw new ForbiddenException(Message.LEADER_NOT_REMOVE_SELF);
    }

    const userToRemove = await this.userRepository.getUserById(user_id);

    if (!userToRemove) {
      throw new NotFoundException(Message.USER_NOT_FOUND);
    }

    if (userToRemove.squadId !== team.id) {
      throw new NotFoundException(Message.USER_NOT_ALREADY_TEAM);
    }

    const userUpdated = await this.teamRepository.removeMember(userToRemove.id);

    if (!userUpdated) {
      throw new Error(Message.FAILED_REMOVE_MEMBER);
    }

    return userUpdated;
  }

  public async delete(user: IUser, team_id: string): Promise<ISquad> {
    const team = await this.teamRepository.getById(team_id);

    if (!team) {
      throw new NotFoundException(Message.TEAM_NOT_FOUND);
    }

    if (!user.isAdmin && team.leaderId !== user.id) {
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
    }

    const teamMembers = await this.teamRepository.getMembers(team.id);

    if (teamMembers.length > 1) {
      throw new ConflictException(Message.TEAM_ALREADY_MEMBERS);
    }

    const teamDeleted = await this.teamRepository.delete(team.id);

    if (!teamDeleted) {
      throw new Error(Message.FAILED_DELETE_TEAM);
    }

    return teamDeleted;
  }

  public async update(
    user: IUser,
    team_id: string,
    data: UpdateTeamDto
  ): Promise<ISquad> {
    const team = await this.teamRepository.getById(team_id);

    if (!team) {
      throw new NotFoundException(Message.TEAM_NOT_FOUND);
    }

    if (!user.isAdmin && team.leaderId !== user.id) {
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION);
    }

    if (data.leaderId) {
      const userToLeader = await this.userRepository.getUserById(data.leaderId);

      if (!userToLeader) {
        throw new NotFoundException(Message.USER_NOT_FOUND);
      }

      if (userToLeader.squadId !== null) {
        throw new ConflictException(Message.USER_ALREADY_TEAM);
      }
    }

    const teamUpdated = await this.teamRepository.update(team_id, data);

    if (!teamUpdated) {
      throw new Error(Message.FAILED_UPDATE_TEAM);
    }

    if (data.leaderId) {
      await this.teamRepository.removeMember(team.leaderId);
      await this.teamRepository.addMember(teamUpdated.leaderId, teamUpdated.id);
    }

    return teamUpdated;
  }
}
