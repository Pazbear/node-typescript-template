import dotenv from "dotenv";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import compression from "compression"; //응답 본문 압축 => 응답하는 데이터의 크기가 큰 경우 사용( ex. 파일 )
import express_session from "express-session";
import MongoStore from "connect-mongo";
import { connectDB } from "./loader/mongo";

dotenv.config();

const env = process.env.ENV as string;
const PORT =
  env === "PROD" ? process.env.PROD_SERVER_PORT : process.env.DEV_SERVER_PORT;
const MONGO_URL = (
  env === "PROD" ? process.env.PROD_MONGO_URL : process.env.DEV_MONGO_URL
) as string;

(async () => {
  await connectDB(MONGO_URL);
  console.log("MONGODB Connected...");
})();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(
  express_session({
    secret: process.env.COOKIE_SECRET as string, //암호화하는데 쓰일 키
    resave: false, //세션에 변경 사항이 없어도 항상 다시 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 스토어에 강제로 저장할지 여부
    store: MongoStore.create({ mongoUrl: MONGO_URL }), // 세션 저장소
    cookie: {
      httpOnly: true, // true면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보 볼수 없음
      secure: true, // true면 https 환경에서만 쿠키 정보를 주고 받도록 처리
      maxAge: 600000, // 쿠키가 유지되는 시간(ms)
    },
    name: process.env.SESSION_COOKIE_NAME,
  })
);

app.get("/", (req, res, next) => {
  console.log(req.session);
  res.send(req.session);
});

const server = new http.Server(app);

server.listen(PORT, (): void => {
  console.log(`
    ################################################
    🛡️  Server listening on port: ${PORT}  🛡️
    ################################################
  `);
});

export default app;
