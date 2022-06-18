import mongoose from "mongoose";
import { IUser, User } from "../../db/models/User";

export async function findAllUsers(): Promise<Partial<IUser>[]> {
  return await User.find();
}

export async function findUserById(id: string): Promise<Partial<IUser> | null> {
  return await User.findById(id);
}

export async function findUserByEmail(
  email: string
): Promise<Partial<IUser> | null> {
  return await User.findOne({ email: email });
}

export async function createUser(user: Partial<IUser>): Promise<void> {
  const newUser = new User(user);
  await newUser.save();
}

export async function updateVerifyToken(
  userId: string,
  encryptedToken: string
): Promise<void> {
  const filter = { _id: userId };

  await User.updateOne(filter, { $set: { verifyToken: encryptedToken } });
}

export async function updateUserVerified(userId: string): Promise<void> {
  const filter = { _id: userId };

  await User.updateOne(filter, {
    $set: { isUserVerified: true },
    $unset: { verifyToken: 0 },
  });
}

export async function updateForgotPassword(
  userId: string,
  password: string
): Promise<void> {
  const filter = { _id: userId };

  await User.updateOne(filter, {
    $set: { password: password },
    $unset: { verifyToken: 0 },
  });
}
