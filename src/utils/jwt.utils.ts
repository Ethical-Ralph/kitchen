import jwt from "jsonwebtoken";
import { serverEnv } from "../config";
import { ForbiddenError } from "./errors.utils";

export class JWTService {
  static sign(payload: any, expiresIn = "1h") {
    return jwt.sign(payload, serverEnv.JWT_SECRET, { expiresIn });
  }

  static verify(token: string) {
    try {
      return jwt.verify(token, serverEnv.JWT_SECRET);
    } catch (err) {
      throw new ForbiddenError("Invalid token");
    }
  }
}
