import { Request, Response, NextFunction } from "express";
import { AuthUser, UserRoleEnum } from "../interfaces";
import { UnauthorizedError } from "../utils";

export const authorize = (requiredRole: UserRoleEnum) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as AuthUser;

      if (!user) {
        throw new UnauthorizedError("Unauthorized");
      }

      if (user.role === requiredRole) {
        next();
      } else {
        throw new UnauthorizedError("Unauthorized");
      }
    } catch (error) {
      next(error);
    }
  };
};
