import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends Document {
  nickname: string;
  email: string;
  password: string;
  avatar?: string;
}

export const UserSchema = new Schema<IUser>({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
});

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
