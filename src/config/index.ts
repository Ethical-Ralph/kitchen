import { config } from "dotenv";

config();

export const databaseEnv = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT || "5432",
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_SSLMODE: process.env.DB_SSLMODE === "REQUIRED",
};

export const serverEnv = {
  PORT: process.env.PORT || "3000",
  JWT_SECRET: process.env.JWT_SECRET as string,
};
