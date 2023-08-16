import express, { Router } from "express";
import { signUp } from "../createUser/createUser";
import { getUser } from "../getUser/getUser";

const userRoutes : Router = express.Router();

userRoutes.post("/signUp", signUp);
userRoutes.get("/getUser", getUser);

export default userRoutes;
