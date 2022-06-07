import dotenv from "dotenv";

import app from "./app";
import http from "http";

import { connectDB } from "./loader/mongo";

dotenv.config();

const env = process.env.ENV as string;
const PORT =
  env === "PROD" ? process.env.PROD_SERVER_PORT : process.env.DEV_SERVER_PORT;
const MONGO_URL = (
  env === "PROD"
    ? process.env.PROD_MONGO_URL
    : env === "TEST"
    ? process.env.TEST_MONGO_URL
    : process.env.DEV_MONGO_URL
) as string;

(async () => {
  try {
    await connectDB(MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error with MongoDB Connecting");
    console.error(err);
  }
})();

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
