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

      const user: IUser = {
        id: result[0].id,
        username: result[0].username,
        firstName: result[0].first_name,
        lastName: result[0].last_name,
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

    const user: IUser = {
      id: result[0].id,
      username: result[0].username,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      email: result[0].email,
      password: result[0].password,
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
        isAdmin: res.is_admin,
      };
    });

    return users;
  }

  public async createUser(user: IUser): Promise<IUser> {
    const result: QueryResultRow = await database.executeQuery({
      query: `INSERT INTO users(username, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
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
      isAdmin: result[0].is_admin,
    };

    return createdUser;
  }
}
