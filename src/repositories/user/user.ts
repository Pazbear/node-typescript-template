import { IUser, User } from "../../db/models/User";

export async function findAllUsers() {
  return await User.find();
}

export async function findUserByEmail(email: string) {
  return await User.findOne({ email: email });
}

export async function createUser(user: Partial<IUser>) {
  const newUser = new User(user);
  return await newUser.save();
}
