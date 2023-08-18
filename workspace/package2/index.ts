import express, { Request, Response } from "express";
import {connectDB} from "../package1/config";
import router from "./routes/routes";

const app = express();
const port = 5000;
app.use(express.json());
connectDB();
app.get("/", router);

console.log("package 2 runnnnninnggg...");

app.listen(3000, () => {
  console.log(`Server is running on port ${3000} from package 2`);
});