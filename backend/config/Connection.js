import mongoose from "mongoose"
import { configDotenv } from "dotenv"
configDotenv();
export const connectDb = async () => {
  const url = process.env.MONGO_URL;
  await mongoose.connect(url);
  console.log('Connection successful!')
}