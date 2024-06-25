import { Request, Response, NextFunction } from "express";
import { JWTService, UnauthorizedError } from "../utils";
import { AuthUser } from "../interfaces";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedError("Authorization header is missing");
    }

    const user = await verifyAccessToken(authorization);

    req.user = user;

    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid access token"));
  }
}

async function verifyAccessToken(authorization: string) {
  if (!authorization) {
    throw new UnauthorizedError("Authorization header is missing");
  }

  const [bearer, accessToken] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw new UnauthorizedError("Invalid authorization header");
  }

  if (!accessToken) {
    throw new UnauthorizedError("Access token is missing");
  }

  try {
    const payload = JWTService.verify(accessToken);

    const user = payload;

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    return user as AuthUser;
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      throw new UnauthorizedError("Access token has expired");
    }

    throw new UnauthorizedError("Invalid access token");
  }
}
