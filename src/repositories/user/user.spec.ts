require("dotenv").config();

import mongoose from "mongoose";
import { connectDB } from "../../loader/mongo";
import { IUser } from "../../db/models/User";
import { createUser, findAllUsers } from "./user";

describe("User Repository", () => {
  let mongoClient: typeof mongoose;

  beforeAll(async () => {
    mongoClient = await connectDB(process.env.TEST_MONGO_URL as string);
  });

  afterAll(async () => {
    await mongoClient.connection.dropDatabase();
  });

  afterEach(async () => {
    await mongoClient.connection.db.dropDatabase();
  });

  test("Get all users", async () => {
    const users = await findAllUsers();

    expect(users.length).toBe(0);
  });

  test("Create User", async () => {
    const newUser: Partial<IUser> = {
      nickname: "testUser",
      email: "email@email.com",
      password: "password",
    };
    await createUser(newUser);

    const users = await findAllUsers();
    expect(users.length).toBe(1);
  });
});
