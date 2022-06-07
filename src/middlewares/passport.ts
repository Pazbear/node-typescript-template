import { Application, NextFunction, Request, Response } from "express";
import passport from "passport";
import passportLocal from "passport-local";
import { IUser } from "../db/models/User";
import hash from "../modules/hash";
import { findUserByEmail } from "../repositories/user/user";

const LocalStrategy = passportLocal.Strategy;

export default function initAuthMiddleware(app: Application) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await findUserByEmail(email);
          if (!user) {
            return done(null, false, {
              message: "존재하지 않는 유저입니다.",
            });
          } else {
            const isValid = await hash.comparePassword(
              password,
              user.password as string
            );
            if (!isValid) {
              return done(null, false, { message: "비밀번호가 틀렸습니다." });
            } else {
              delete user.password;
              return done(null, user);
            }
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(function (user: Partial<IUser>, done) {
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());
}
