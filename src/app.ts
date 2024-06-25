import express from "express";
import { dataSource } from "./database";
import { User } from "./user/entity/user.entity";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const gg = dataSource.getRepository(User).find();
  res.json(gg);
});

export default app;
