import { Request } from "express";
import { IUser } from "../db/models/User";
import jwt from "jsonwebtoken";

export default class JWT {
  static getUserId = (req: Request): string | null => {
    const token = this.extractToken(req);
    if (!token) {
      return null;
    }
    const jwtPayload = this.decodeJWT(token);
    return (jwtPayload as any)?.id || null;
  };

  static extractToken = (req: Request): string | undefined => {
    const TOKEN_PREFIX = "Bearer ";
    const auth = req.headers.authorization;
    const token = auth?.includes(TOKEN_PREFIX)
      ? auth.split(TOKEN_PREFIX)[1]
      : auth;

    return token;
  };

  static decodeJWT = (token: string): any => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      return decodedToken;
    } catch {
      return null;
    }
  };

  static createJWT = async (user: Partial<IUser>): Promise<string> => {
    const token = await jwt.sign(
      { _id: user.id },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "2h",
      }
    );
    return token;
  };

  static createJWT = async (
    user: Partial<IUser>,
    expiresIn: string
  ): Promise<string> => {
    const token = await jwt.sign(
      { _id: user.id },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "30m",
      }
    );
    return token;
  };
}
