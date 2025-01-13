import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {});
    console.log("Connected successfully to mongoDB");
  } catch (error) {
    console.error("Failed to connect to mongoDB", error.message);
    process.exit(1);
  }
};

export default connectDB;
