import dotenv from "dotenv";
import express from "express";
import http from "http";
import { connectDB } from "./services/mongo";

dotenv.config();

const env = process.env.ENV as string;
const PORT =
  env === "PROD" ? process.env.PROD_SERVER_PORT : process.env.DEV_SERVER_PORT;

(async () => {
  await connectDB(
    (env === "PROD"
      ? process.env.PROD_MONGO_URL
      : process.env.DEV_MONGO_URL) as string
  );
  console.log("MONGODB Connected...");
})();

const app = express();

const server = new http.Server(app);

server.listen(PORT, () => {
  console.log(`
    ################################################
    🛡️  Server listening on port: ${PORT}  🛡️
    ################################################
  `);
});
