import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "@tsworkspace/package1/userSchema";
import { db_User } from "../types";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    console.log("getuser called");
    const loginname: string = req.body.name;
    const loginpassword: string = req.body.password;

    const dbuser: db_User | null = await User.findOne({ name: loginname });

    if (dbuser == null) {
      return res.status(400).json({ msg: "No such username found" });
    }

    const result: boolean = await bcrypt.compare(
      loginpassword,
      dbuser.password
    );

    if (!result) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    res.status(200).json({ dbuser });
  } catch (e) {
    console.error("Error in get User:", e);
    res.status(500).json({ message: "An error occurred during getting user" });
  }
};
