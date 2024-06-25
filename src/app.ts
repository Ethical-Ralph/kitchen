import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./modules/user";
import { vendorRouter } from "./modules/vendor";
import { customerRouter } from "./modules/customer";
import { HttpError } from "./utils";

const app = express();

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/customer", customerRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
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
