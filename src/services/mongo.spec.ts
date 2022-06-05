require("dotenv").config();

import mongoose from "mongoose";
import { addNewUser, connectDB, getAllUsers } from "./mongo";
import { IUser } from "../db/models/User";

describe("MongoDB Service", () => {
  let mongoClient: typeof mongoose;

  beforeAll(async () => {
    console.log(process.env.MONGO_TEST_URL);
    mongoClient = await connectDB(process.env.MONGO_TEST_URL as string);
  });

  afterAll(async () => {
    await mongoClient.connection.close();
  });

  afterEach(async () => {
    await mongoClient.connection.db.dropDatabase();
  });

  test("Get all users", async () => {
    const users = await getAllUsers();

    expect(users.length).toBe(0);
  });

  test("Add new User", async () => {
    const newUser: Partial<IUser> = {
      nickname: "testUser",
      email: "email@email.com",
      password: "password",
    };
    await addNewUser(newUser);

    const users = await getAllUsers();
    expect(users.length).toBe(1);
  });
});
