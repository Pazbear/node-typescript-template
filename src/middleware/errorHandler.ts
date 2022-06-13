import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message, err.statusCode);
  if (res.headersSent) {
    return next(err);
  }

  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "알 수 없는 오류" });
};
