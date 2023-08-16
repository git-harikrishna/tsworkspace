import { connectDB, dataPopulate } from "./config"; //
import express, { Request, Response } from "express";
import { signUp } from "./createUser/createUser";

const app = express();

app.use(express.json());

const port = 3000;
connectDB();
dataPopulate();
app.post("/signUp", signUp);

console.log("package 1 runnnnninnggg...");

app.listen(port, () => {
  console.log(`Server is running on port ${port} from package 1`);
});
