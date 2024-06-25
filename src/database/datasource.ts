import * as path from "path";
import { DataSource } from "typeorm";
import { env } from "./database.env";

const dataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: [path.join(__dirname, "/../**/*.entity{.ts,.js}")],
  synchronize: true,
});

export { dataSource };
