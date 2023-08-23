import mongoose, { ConnectOptions } from "mongoose";
import userModel from "./userSchema"; // Import IUser from the correct path
import { config } from "dotenv";

const connectDB = async (): Promise<void> => {
  try {
    config();

    const url: string | undefined = process.env.dbUrl?.toString();

    const mongooseOptions: ConnectOptions = {};

    console.log(url + " url ");

    if (url == undefined) return;

    await mongoose.connect(url, mongooseOptions);
    await userModel
      .deleteMany({})
      .then(() => console.log("done deletion"))
      .catch((e) => console.log(e));
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

// the password is hashed and stored

export default connectDB;
