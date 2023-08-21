import mongoose, { ConnectOptions } from "mongoose";
import UserModel from "./userSchema"; // Import IUser from the correct path
import { config } from "dotenv";
import bcrypt from "bcrypt";

const connectDB = async (): Promise<void> => {
  try {
    config();

    const url: string | undefined = process.env.dbUrl?.toString();

    const mongooseOptions: ConnectOptions = {};

    console.log(url + " url ");

    if (url == undefined) return;

    await mongoose.connect(url, mongooseOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};



// the password is hashed and stored

export default connectDB ;
