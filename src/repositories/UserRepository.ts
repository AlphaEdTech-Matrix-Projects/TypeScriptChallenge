import { QueryResultRow } from "pg";
import database from "../database/Database";
import { IUser } from "../interfaces/interfaces";
import { InternalServerException, NotFoundException } from "../utils/Exception";

export default class UserRepository {
  public async getMyUser(id: string): Promise<IUser> {
    try {
      const result: QueryResultRow = await database.executeQuery({
        query: `Select * FROM users WHERE id = $1`,
        args: [id],
      });

      if (result.length === 0) {
        throw new NotFoundException("Usuario não encontrado");
      }

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
}
