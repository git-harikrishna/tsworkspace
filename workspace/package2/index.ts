import express, { Request, Response } from "express";
import connectDB from "@tsworkspace/package1";
import userRoutes from "./routes/routes";

const app = express();
app.use(express.json());
connectDB();
app.use("/", userRoutes);

console.log("package 2 runnnnninnggg...");

app.listen(3000, () => {
  console.log(`Server is running on port ${3000} from package 2`);
});