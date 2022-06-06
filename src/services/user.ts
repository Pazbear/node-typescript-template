import { Request, Response } from "express";
import { IUser, User } from "../db/models/User";
import {
  createUser,
  findAllUsers,
  findUserByEmail,
} from "../repositories/user/user";
import hash from "../modules/hash";

export async function getAllUsers(req: Request, res: Response) {
  try {
    res.status(200).send({ users: await findAllUsers() });
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function register(req: Request, res: Response) {
  try {
    const newUser: Partial<IUser> = {
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
    };
    await createUser(newUser);
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) {
      const isValid = await hash.comparePassword(
        req.body.password,
        user.password
      );
      if (isValid) {
        req.session.id = user.id;
        req.session.save((err) => {
          if (err) throw new Error(err as string);
          res.status(200).send();
        });
      } else {
        throw new Error("이메일이나 비밀번호가 틀렸습니다.");
      }
    } else {
      throw new Error("유저가 존재하지 않습니다.");
    }
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    req.session.destroy(() => {
      res.clearCookie(process.env.SESSION_COOKIE_NAME as string);
      res.status(200).send();
    });
  } catch (err) {
    throw new Error(err as string);
  }
}
