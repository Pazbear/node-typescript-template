import dotenv from "dotenv";
import { Request } from "express";
import { PassportStatic } from "passport";
import { Strategy, StrategyOptions } from "passport-jwt";
import { findUserById } from "../repositories/user/user";
dotenv.config();

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.jwt;
  }

  return jwt;
};

const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET_KEY!,
};

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      await findUserById(payload._id)
        .then((user) => {
          user ? done(null, user) : done(null, false);
        })
        .catch(() => done(null, false));
    })
  );
};
