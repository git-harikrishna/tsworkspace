import express, { Request, Response } from "express";
import { getUser } from "./getUser/getUser";
import {connectDB} from "../package1/config";

const app = express();
const port = 5000;
app.use(express.json());
connectDB();
app.get("/getUser", getUser);

console.log("package 2 runnnnninnggg...");

app.listen(port, () => {
  console.log(`Server is running on port ${port} from package 2`);
});
