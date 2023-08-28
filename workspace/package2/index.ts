import express, { NextFunction, Request, Response } from "express";
import connectDB from "@tsworkspace/package1";
import bcrypt from "bcrypt";
import { db_User } from "../package1/types";
import UserP2 from "./userSchema";

const app = express();
app.use(express.json());
connectDB().then(async()=>{await UserP2.deleteMany({}); console.log("Deleted uses at P2");});

app.post(
  "/signUp",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    console.log("addUser called");
    console.log(req.body);

    const temp: string = req.body.password;
    const saltPassword: string = await bcrypt.genSalt(10);
    const securePassword: string = await bcrypt.hash(temp, saltPassword);

    const user: db_User = {
      name: req.body.name,
      mobile_no: req.body.mobile_no,
      email: req.body.email,
      password: securePassword,
      emp_code: req.body.emp_code,
    };

    try {
      if (!req.body.name) {
        return res.status(400).json({ message: "User name can't be null" });
      }

      const dbuser: db_User | null = await UserP2.findOne({
        name: req.body.name,
      });
      if (dbuser) {
        return res.status(400).json({ message: "User name already exists." });
      }

      console.log("Checkpoint 1");

      const newuser = new UserP2(user);

      console.log("Checkpoint 2: " + newuser);

      await newuser.save();

      console.log("Checkpoint 3");

      return res
        .status(200)
        .json({ msg: "User added successfully", data: newuser });
    } catch (e) {
      console.error("Error in signUp:", e);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request." });
    }
  }
);

app.get(
  "/getUser",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      console.log("getuser called");
      const loginname: string = req.body.name;
      const loginpassword: string = req.body.password;

      const dbuser: db_User | null = await UserP2.findOne({ name: loginname });
      // console.log(UserP2.findOne({ name: loginname }))

      if (dbuser == null) {
        return res.status(400).json({ msg: "No such username found" });
      }

      const result: boolean = await bcrypt.compare(
        loginpassword,
        dbuser.password
      );

      console.log(loginpassword + " "+ dbuser.password + "  " + result);

      if (loginpassword != dbuser.password) {
        return res.status(401).json({ msg: "Invalid Password" });
      }

      res.status(200).json({ dbuser });
    } catch (e) {
      console.error("Error in get User:", e);
      res
        .status(500)
        .json({ message: "An error occurred during getting user" });
    }
  }
);

export default app;

console.log("package 2 runnnnninnggg...");