require("dotenv").config();

import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { connectDB } from "../../loader/mongo";
import { IUser } from "../../db/models/User";

import * as userServices from "../../controllers/user";

const agent = request.agent(app);

describe("User Routes", () => {
  let mongoClient: typeof mongoose;

  beforeAll(async () => {
    try {
      mongoClient = await connectDB(process.env.TEST_MONGO_URL as string);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await mongoClient.connection.dropDatabase();
  });

  afterEach(async () => {
    await mongoClient.connection.db.dropDatabase();
  });

  test("/users/all", async () => {
    const res = await agent.get("/users/all").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ users: [] });
  });

  test("/users/register", async () => {
    const newUser: Partial<IUser> = {
      nickname: "newUser",
      email: "test@test.com",
      password: "password",
    };
    const res = await agent.post("/users/register").send(newUser);
    expect(res.statusCode).toEqual(201);
  });

  test("/users/login - 401", async () => {
    const loginInfo = {
      email: "test@test.com",
      password: "password",
    };
    const res = await agent.post("/users/login").send(loginInfo);
    expect(res.statusCode).toEqual(401);
  });

  test("/users/login - 200", async () => {
    const newUser: Partial<IUser> = {
      nickname: "newUser",
      email: "test@test.com",
      password: "password",
    };
    const loginInfo = {
      email: "test@test.com",
      password: "password",
    };
    await agent.post("/users/register").send(newUser);
    const res = await agent.post("/users/login").send(loginInfo);
    expect(res.statusCode).toEqual(200);
  });
});
