import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./user";
import { HttpError } from "./utils";

const app = express();

app.use(express.json());

app.use("/api/auth", userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;
