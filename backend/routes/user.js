import express from "express";
import { createUser, getUser, loginUser } from "../controllers/user.js";

// auth function ?

export const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/get", getUser);
//userRouter.get("/user/_id, getUser")
userRouter.post('/', loginUser);

// localhost:8000/user/get
