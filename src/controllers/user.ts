import { NextFunction, Request, RequestHandler, Response } from "express";
import { IUser, User } from "../db/models/User";
import {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateForgotPassword,
  updateUserVerified,
  updateVerifyToken,
} from "../repositories/user/user";
import hash from "../modules/hash";
import JWT from "../modules/jwt";
import createHttpError, { InternalServerError } from "http-errors";
import { nextTick } from "process";
import mail from "../modules/mail";

export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ users: await findAllUsers() });
  } catch (err) {
    console.error(err);
    return next(InternalServerError);
  }
};

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nickname, email, password, avatar } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return next(createHttpError(422, "이메일이 이미 존재합니다."));
    const encryptedPassword = await hash.encryptPassword(password);
    const newUser: Partial<IUser> = {
      nickname: nickname,
      email: email,
      password: encryptedPassword,
      avatar: avatar,
    };
    await createUser(newUser);
    return res.json({ msg: "유저가 생성되었습니다." });
  } catch (err) {
    console.error(err);
    return next(InternalServerError);
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);

    if (user) {
      if (!user.isUserVerified)
        return next(createHttpError(406, "아직 인증된 유저가 아닙니다."));
      const isValid = await hash.comparePassword(password, user.password!);
      if (isValid) {
        const token = await JWT.createJWT(user);
        res.cookie("jwt", token);
        return res.json({
          msg: "성공적으로 로그인되었습니다.",
          nickname: user.nickname,
          token: token,
        });
      } else {
        return next(createHttpError(401, "비밀번호가 틀렸습니다."));
      }
    } else {
      return next(createHttpError(404, "유저가 존재하지 않습니다."));
    }
  } catch (err) {
    console.error(err);
    return next(InternalServerError);
  }
};

export const sendVerificationMail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: { email: string } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return next(createHttpError(404, "Email Not valid"));

    if (user.isUserVerified)
      return next(createHttpError(406, "User already verified"));

    const encryptedToken = await hash.encryptUserId(user.id!);

    const jwtToken = await JWT.createJWT(user, "30m");

    mail.send({
      to: user.email!,
      subject: "Email Verification",
      html: `Your Verification Link => <a>${jwtToken}</a>`,
    });

    await updateVerifyToken(user.id!, encryptedToken);

    res.json({ message: `성공적으로 보냈습니다.` });
  } catch (err) {
    return next(InternalServerError);
  }
};

export const verifyUserMail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token }: { token: string } = req.body;

  try {
    const decodedToken = JWT.decodeJWT(token);
    const user = await findUserById(decodedToken._id);
    if (!user) return next(createHttpError(401, "Token Invalid"));
    await updateUserVerified(user.id!);
    res.json({ message: "Email Verified" });
  } catch (error) {
    return next(createHttpError(401, "Token Invalid"));
  }
};

export const sendForgotPasswordMail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: { email: string } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return next(createHttpError(404, "이메일이 없습니다."));

    const encryptedToken = await hash.encryptUserId(user.id!);

    const jwtToken = await JWT.createJWT(user, "30m");

    mail.send({
      to: user.email!,
      subject: "Forgot Password Verification",
      html: `Your Verification Link => <a>${jwtToken}</a>`,
    });

    await updateVerifyToken(user.id!, encryptedToken);

    res.json({ message: `성공적으로 보냈습니다.` });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const verifyForgotMail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, password }: { token: string; password: string } = req.body;

  try {
    const decodedToken = JWT.decodeJWT(token);
    const user = await findUserById(decodedToken._id);
    if (!user) return next(createHttpError(401, "Token Invalid"));

    const encryptedPassword = await hash.encryptPassword(password);
    await updateForgotPassword(user.id!, encryptedPassword);
    res.json({ message: "비밀번호가 변경되었습니다." });
  } catch (error) {
    return next(createHttpError(401, "Token Invalid"));
  }
};
