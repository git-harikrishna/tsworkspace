import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { db_User } from "../../../types";
import User from "../../../userSchema";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
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

    const dbuser: db_User | null = await User.findOne({ name: req.body.name });
    if (dbuser) {
      return res.status(400).json({ message: "User name already exists." });
    }

    console.log("Checkpoint 1");

    const newuser = new User(user);

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
};
