import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends Document {
  id?: string;
  nickname: string;
  email: string;
  password?: string;
  avatar?: string;
  isUserVerified?: boolean;
  verifyToken: string;
}

const UserSchema = new Schema<IUser>({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  isUserVerified: { type: Boolean, default: false },
  verifyToken: { type: String },
});

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
