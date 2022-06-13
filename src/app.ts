import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import compression from "compression"; //응답 본문 압축 => 응답하는 데이터의 크기가 큰 경우 사용( ex. 파일 )
import indexRouter from "./routes/index";
import createHttpError from "http-errors";
import { errorHandler } from "./middleware/errorHandler";
import passport from "passport";
import kPassport from "./middleware/passport";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(passport.initialize());
kPassport(passport);

app.use("/", indexRouter);
app.use(() => {
  throw createHttpError(404, "Route Not Found");
});

app.use(errorHandler);

export default app;
