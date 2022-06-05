import mongoose, { ConnectOptions } from "mongoose";
import { IUser, User } from "../db/models/User";

export async function connectDB(mongoURL: string) {
  return await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
}

export async function getAllUsers() {
  return await User.find();
}

export async function addNewUser(user: Partial<IUser>) {
  const newUser = new User(user);
  return await newUser.save();
}
