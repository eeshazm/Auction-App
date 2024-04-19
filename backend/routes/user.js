import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/user.js";

// auth function ?

export const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/get", getUsers);
userRouter.post('/login', loginUser);

// localhost:8000/user/get
