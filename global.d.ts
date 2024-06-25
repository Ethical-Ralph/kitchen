import express from "express";
import { AuthUser } from "./src/interfaces";

declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
    }
  }
}

export {};
