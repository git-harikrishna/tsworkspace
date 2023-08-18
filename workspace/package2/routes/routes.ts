import express, { Router } from "express";
import { signUp } from "../createUser/createUser";
import { getUser } from "../getUser/getUser";

const router : Router = express.Router();

router.post("/signUp", signUp);
router.get("/getUser", getUser);

export default router;
