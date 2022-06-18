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

export const sendVerificationValidate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(userSchema.sendVerification, req.body, next);
};

export const verifyUserMailValidate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(userSchema.verifyUserMail, req.body, next);
};

export const sendForgotPasswordMailValidate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(userSchema.sendForgotPasswordMail, req.body, next);
};

export const verifyForgotMailValidate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(userSchema.verifyForgotMail, req.body, next);
};
