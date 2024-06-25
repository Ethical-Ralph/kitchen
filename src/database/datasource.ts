import * as path from "path";
import { DataSource } from "typeorm";
import { databaseEnv } from "../config";

const dataSource = new DataSource({
  type: "postgres",
  host: databaseEnv.DB_HOST,
  port: +databaseEnv.DB_PORT,
  username: databaseEnv.DB_USERNAME,
  password: databaseEnv.DB_PASSWORD,
  database: databaseEnv.DB_DATABASE,
  entities: [path.join(__dirname, "/../**/*.entity{.ts,.js}")],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
});

export { dataSource };
