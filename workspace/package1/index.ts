import { connectDB, dataPopulate } from "./config"; //
import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

const port = 5000;
connectDB();
dataPopulate();

console.log("package 1 runnnnninnggg...");

app.listen(port, () => {
  console.log(`Server is running on port ${port} from package 1`);
});
