import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import compression from "compression"; //응답 본문 압축 => 응답하는 데이터의 크기가 큰 경우 사용( ex. 파일 )
import indexRouter from "./routes/index";
import createHttpError from "http-errors";
import responseTime from "response-time";
import morgan, { StreamOptions } from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import passport from "passport";
import kPassport from "./middleware/passport";
import logger from "./modules/logger";

dotenv.config();

const app: Application = express();
const loggerStream: StreamOptions = {
  write: (message) => logger.info(message),
};
const morganCombined =
  ":method :url :status :res[content-length] - :response-time ms";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(
  morgan(morganCombined, {
    stream: loggerStream,
  })
);
app.use(
  responseTime((req, res, time) => {
    console.log(`${req.method} ${req.url} ${time}`);
  })
);
app.use(passport.initialize());
kPassport(passport);

app.use("/", indexRouter);
app.use(() => {
  throw createHttpError(404, "Route Not Found");
});

app.use(errorHandler);

export default app;
