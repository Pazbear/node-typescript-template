import Joi from "joi";

export const userSchema = {
  register: Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  sendVerification: Joi.object({
    email: Joi.string().email().required(),
  }),
  verifyUserMail: Joi.object({
    token: Joi.string().required(),
  }),
  sendForgotPasswordMail: Joi.object({
    email: Joi.string().email().required(),
  }),
  verifyForgotMail: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
