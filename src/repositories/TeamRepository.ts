import { QueryResultRow } from "pg";
import database from "../database/Database";
import { ISquad, IUser } from "../interfaces/interfaces";
import { CreateTeamDto, UpdateTeamDto } from "../controllers/TeamsController";

export default class TeamRepository {
  public async getById(id: string): Promise<ISquad | null> {
    const result: QueryResultRow = await database.executeQuery({
      query: `Select * FROM squad WHERE id = $1`,
      args: [id],
    });

    if (!result || result.length === 0) {
      return null;
    }

    const team: ISquad = {
      id: result[0].id,
      name: result[0].name,
      leaderId: result[0].fk_leader_id,
    };

    return team;
  }

  public async getByLeaderId(id: string): Promise<ISquad | null> {
    const result: QueryResultRow = await database.executeQuery({
      query: `Select * FROM squad WHERE fk_leader_id = $1`,
      args: [id],
    });

    if (!result || result.length === 0) {
      return null;
    }

    const team: ISquad = {
      id: result[0].id,
      name: result[0].name,
      leaderId: result[0].fk_leader_id,
    };

    return team;
  }

  public async getAll(): Promise<ISquad[]> {
    const result: QueryResultRow = await database.executeQuery({
      query: `Select * FROM squad`,
    });

    const teams: ISquad[] = result.map((res: any) => {
      return {
        id: res.id,
        name: res.name,
        leaderId: res.fk_leader_id,
      };
    });

    return teams;
  }

  public async getMembers(team_id: string): Promise<IUser[]> {
    const result: QueryResultRow = await database.executeQuery({
      query: `Select * FROM users WHERE fk_squad_id = $1`,
      args: [team_id],
    });

    const users: IUser[] = result.map((res: any) => {
      return {
        id: res.id,
        username: res.username,
        firstName: res.first_name,
        lastName: res.last_name,
        email: res.email,
        squadId: res.fk_squad_id,
        isAdmin: res.is_admin,
      };
    });

    return users;
  }

  public async create(data: CreateTeamDto): Promise<ISquad> {
    const result: QueryResultRow = await database.executeQuery({
      query: `INSERT INTO squad(name, fk_leader_id) VALUES ($1, $2) RETURNING *`,
      args: [data.name, data.leaderId],
    });

    const createdTeam: ISquad = {
      id: result[0].id,
      name: result[0].name,
      leaderId: result[0].fk_leader_id,
    };

    return createdTeam;
  }

  public async addMember(
    user_id: string,
    team_id: string
  ): Promise<IUser | null> {
    const result: QueryResultRow = await database.executeQuery({
      query: `
        UPDATE users
        SET 
          fk_squad_id = $2
        WHERE id = $1
        RETURNING *;
      `,
      args: [user_id, team_id],
    });

    if (!result || result.length === 0) {
      return null;
    }

    const updatedUser: IUser = {
      id: result[0].id,
      username: result[0].username,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      email: result[0].email,
      squadId: result[0].fk_squad_id,
      isAdmin: result[0].is_admin,
    };

    return updatedUser;
  }

  public async removeMember(user_id: string): Promise<IUser | null> {
    const result: QueryResultRow = await database.executeQuery({
      query: `
        UPDATE users
        SET 
          fk_squad_id = null
        WHERE id = $1
        RETURNING *;
      `,
      args: [user_id],
    });

    if (!result || result.length === 0) {
      return null;
    }

    const updatedUser: IUser = {
      id: result[0].id,
      username: result[0].username,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      email: result[0].email,
      squadId: result[0].fk_squad_id,
      isAdmin: result[0].is_admin,
    };

    return updatedUser;
  }

  public async delete(team_id: string): Promise<ISquad | null> {
    const result: QueryResultRow = await database.executeQuery({
      query: `DELETE FROM squad WHERE id = $1 RETURNING *`,
      args: [team_id],
    });

    if (!result || result.length === 0) {
      return null;
    }

    const deletedTeam: ISquad = {
      id: result[0].id,
      name: result[0].name,
      leaderId: result[0].fk_leader_id,
    };

    return deletedTeam;
  }

  public async update(
    team_id: string,
    data: UpdateTeamDto
  ): Promise<ISquad | null> {
    const result: QueryResultRow = await database.executeQuery({
      query: `
          UPDATE squad
          SET 
            name = COALESCE($1, name),
            fk_leader_id = COALESCE($2, fk_leader_id)
          WHERE id = $3
          RETURNING *;
        `,
      args: [data.name, data.leaderId, team_id],
    });

    if (!result || result.length === 0) {
      return null;
    }

    const updatedTeam: ISquad = {
      id: result[0].id,
      name: result[0].name,
      leaderId: result[0].fk_leader_id,
    };

    return updatedTeam;
  }
}
