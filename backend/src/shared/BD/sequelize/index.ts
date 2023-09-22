import { db } from "@/shared/config/config.postgres";
import { Sequelize } from "sequelize";


export const dbConexion = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'postgres',
  port: +db.port,
  logging: false
});
