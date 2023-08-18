import express, { Request, Response } from "express";
import { getUser } from "./getUser/getUser";
import {connectDB} from "../package1/config";

const app = express();
const port = 5000;
app.use(express.json());
connectDB();
app.get("/getUser", getUser);

console.log("package 2 runnnnninnggg...");

app.listen(3000, () => {
  console.log(`Server is running on port ${3000} from package 2`);
});