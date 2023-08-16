import mongoose, { ConnectOptions } from "mongoose";
import UserModel from "../../userSchema"; // Import IUser from the correct path
import { config } from "dotenv";
import bcrypt from "bcrypt";

const connectDB = async (): Promise<void> => {
  try {
    config();

    const url:string | undefined = process.env.dbUrl?.toString();

    const mongooseOptions: ConnectOptions = {
    };

    console.log(url + " url ");

    if (url == undefined)
     return ;

    await mongoose.connect(url, mongooseOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

const dataPopulate = async (): Promise<void> =>{
  const now: Date = new Date();
  // const dob = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();


  const userDummy = [
    {
      name: "dummy1",
      mobile_no: 9445582495, 
      password: "password",
      emp_code : "i1",
      blood_grp : "O+ve"
    },
    {
      name: "dummy2",
      password: "password",
      mobile_no: 1111111111,
      empcode : "i2",
    },
    {
      name: "dummy 3",
      password: "password",
      mobile_no : 2222222222,
      emp_code : "i3",
      dob : now
    },
  ];

  // dummy users are created for data population while server starting

  try {
    await UserModel.deleteMany({});

    for (let i = 0; i < userDummy.length; i++) {
      let temp = userDummy[i].password;

      const saltPassword: string = await bcrypt.genSalt(10);
      const securePassword: string = await bcrypt.hash(temp, saltPassword);

      userDummy[i].password = securePassword;
    }

    await UserModel.insertMany(userDummy);
    console.log("Dummy users inserted");
  } catch (error) {
    console.error("Error inserting dummy users:", error);
  }
};

// the password is hashed and stored
export { connectDB, dataPopulate };
