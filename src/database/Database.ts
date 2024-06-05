import { config } from 'dotenv';
import pg, { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { IExecuteQuery } from '../interfaces/interfaces';

class Database {
  private pool: Pool;

  public constructor() {
    config();

    this.pool = new pg.Pool({
      user: process.env.DBUSER as string,
      host: process.env.PGHOST as string,
      database: process.env.PGDATABASE as string,
      port: Number(process.env.PGPORT),
      max: 20
    });
  }

  public async executeQuery<T extends QueryResultRow>(value: IExecuteQuery): Promise<T[]> {
    const client: PoolClient = await this.pool.connect();

    try {
      await client.query("BEGIN");
      const result: QueryResult<T> = await client.query<T>(value.query, value.args);
      await client.query("COMMIT");

      return result.rows;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

}

const database: Database = new Database();
export default database;