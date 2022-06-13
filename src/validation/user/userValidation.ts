import { NextFunction, Request, RequestHandler, Response } from "express";
import validator from "../utils/validator";
import { userSchema } from "./userSchema";

export const registerValidate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(userSchema.register, req.body, next);
};

export const loginValidate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(userSchema.login, req.body, next);
};
