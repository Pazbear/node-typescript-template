import { NextFunction } from "express";
import createHttpError from "http-errors";
import Joi from "joi";

const validator = async (
  shcemaName: Joi.ObjectSchema,
  body: object,
  next: NextFunction
) => {
  const value = await shcemaName.validate(body);

  try {
    value.error
      ? next(createHttpError(422, value.error.details[0].message))
      : next();
  } catch (error) {
    console.error(error);
  }
};

export default validator;
