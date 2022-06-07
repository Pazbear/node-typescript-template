import mongoose from "mongoose";
import { IUser, User } from "../../db/models/User";

export async function findAllUsers() {
  return await User.find();
}

export async function findUserById(id: string) {
  return await User.findById(id);
}

export async function findUserByEmail(email: string) {
  return await User.findOne({ email: email });
}

export async function createUser(user: Partial<IUser>) {
  const newUser = new User(user);
  await newUser.save();
}
