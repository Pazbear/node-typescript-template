import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import compression from "compression"; //응답 본문 압축 => 응답하는 데이터의 크기가 큰 경우 사용( ex. 파일 )
import express_session from "express-session";
import MongoStore from "connect-mongo";
import indexRouter from "./routes/index";
import initAuthMiddleware from "./middlewares/passport";
import { ConnectMongoOptions } from "connect-mongo/build/main/lib/MongoStore";

dotenv.config();

const app: Application = express();

const env = process.env.ENV as string;
const MONGO_URL = (
  env === "PROD"
    ? process.env.PROD_MONGO_URL
    : env === "TEST"
    ? process.env.TEST_MONGO_URL
    : process.env.DEV_MONGO_URL
) as string;

console.log(env);
console.log(MONGO_URL);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(
  express_session({
    store: MongoStore.create({ mongoUrl: MONGO_URL } as ConnectMongoOptions), // 세션 저장소
    secret: process.env.COOKIE_SECRET as string, //암호화하는데 쓰일 키
    resave: false, //세션에 변경 사항이 없어도 항상 다시 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 스토어에 강제로 저장할지 여부
    cookie: {
      httpOnly: true, // true면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보 볼수 없음
      secure: true, // true면 https 환경에서만 쿠키 정보를 주고 받도록 처리
      maxAge: 600000, // 쿠키가 유지되는 시간(ms)
    },
    name: process.env.SESSION_COOKIE_NAME,
  })
);

initAuthMiddleware(app);

app.use("/", indexRouter);

export default app;
