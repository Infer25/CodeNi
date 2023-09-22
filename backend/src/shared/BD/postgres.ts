import { Pool } from 'pg';
import { db } from '../config/config.postgres';



export const pool = new Pool({
  user: db.user,
  host: db.host,
  password: db.password,
  database: db.database,
  port: Number(db.port)
});
