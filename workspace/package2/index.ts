import express, { Request, Response } from "express";
import { getUser } from "./getUser/getUser";
import {connectDB} from "../package1/config";
import userRoutes from "./routes/routes";

const app = express();
const port = 3000;
app.use(express.json());
connectDB();
app.use("/", userRoutes);

console.log("package 2 runnnnninnggg...");

app.listen(port, () => {
  console.log(`Server is running on port ${port} from package 2`);
});
