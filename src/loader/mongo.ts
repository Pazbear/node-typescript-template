import mongoose, { ConnectOptions } from "mongoose";

export async function connectDB(mongoURL: string) {
  return await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
}
