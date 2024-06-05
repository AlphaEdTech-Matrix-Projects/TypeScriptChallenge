import { QueryResultRow } from "pg";
import database from "../database/Database";
import { IUser } from "../interfaces/interfaces";

export default class UserRepository {
  public async getUserById(id: string): Promise<IUser | null> {
    try {
      const result: QueryResultRow = await database.executeQuery({
        query: `Select * FROM users WHERE id = $1`,
        args: [id],
      });

      if (!result || result.length === 0) {
        return null;
      }

      const user: IUser = {
        id: result[0].id,
        username: result[0].username,
        firstName: result[0].first_name,
        lastName: result[0].last_name,
        squadId: result[0].fk_squad_id,
        email: result[0].email,
        isAdmin: result[0].is_admin,
      };

      return user;
    } catch (error: any) {
      throw error;
    }
  }

  public async getUserAllDataByUsername(
    username: string
  ): Promise<IUser | null> {
    const result: QueryResultRow = await database.executeQuery({
      query: `Select * FROM users WHERE username = $1`,
      args: [username],
    });

    if (!result || result.length === 0) {
      return null;
    }

    const user: IUser = {
      id: result[0].id,
      username: result[0].username,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      email: result[0].email,
      squadId: result[0].fk_squad_id,
      password: result[0].password,
      isAdmin: result[0].is_admin,
    };

    return user;
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const result: QueryResultRow = await database.executeQuery({
      query: `Select * FROM users WHERE email = $1`,
      args: [email],
    });

    if (!result || result.length === 0) {
      return null;
    }

    const user: IUser = {
      id: result[0].id,
      username: result[0].username,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      email: result[0].email,
      squadId: result[0].fk_squad_id,
      isAdmin: result[0].is_admin,
    };

    return user;
  }

  public async getAllUsers(): Promise<IUser[]> {
    const result: QueryResultRow = await database.executeQuery({
      query: `Select * FROM users`,
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

  public async createUser(user: IUser): Promise<IUser> {
    const result: QueryResultRow = await database.executeQuery({
      query: `INSERT INTO users(username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      args: [
        user.username,
        user.firstName,
        user.lastName,
        user.email,
        user.password,
      ],
    });

    const createdUser: IUser = {
      id: result[0].id,
      username: result[0].username,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      email: result[0].email,
      squadId: result[0].fk_squad_id,
      isAdmin: result[0].is_admin,
    };

    return createdUser;
  }

  public async updateUserById(
    user: Partial<IUser> & { id: string }
  ): Promise<IUser | null> {
    const {
      id,
      username,
      firstName,
      lastName,
      email,
      password,
      squadId,
      isAdmin,
    } = user;

    try {
      const result: QueryResultRow = await database.executeQuery({
        query: `
          UPDATE users
          SET 
            username = COALESCE($1, username),
            first_name = COALESCE($2, first_name),
            last_name = COALESCE($3, last_name),
            email = COALESCE($4, email),
            password = COALESCE($5, password),
            fk_squad_id = COALESCE($6, fk_squad_id),
            is_admin = COALESCE($7, is_admin)
          WHERE id = $8
          RETURNING *;
        `,
        args: [
          username,
          firstName,
          lastName,
          email,
          password,
          squadId,
          isAdmin,
          id,
        ],
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
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteUserById(user: IUser): Promise<IUser | null> {
    try {
      const result: QueryResultRow = await database.executeQuery({
        query: `DELETE FROM users WHERE id = $1`,
        args: [user.id],
      });

      if (!result || result.length === 0) {
        return null;
      }

      const deletedUser: IUser = {
        id: result[0].id,
        username: result[0].username,
        firstName: result[0].first_name,
        lastName: result[0].last_name,
        email: result[0].email,
        squadId: result[0].fk_squad_id,
        isAdmin: result[0].is_admin,
      };

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
