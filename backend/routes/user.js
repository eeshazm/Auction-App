import express from "express";
import { createUser, getUser, loginUser, updateAuctionsCreated, incrementItemsOwned,getAuctions } from "../controllers/user.js";




export const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/get", getUser);
userRouter.post("/auctions", getAuctions);
userRouter.post('/', loginUser);
userRouter.post('/updateAuctions', updateAuctionsCreated);
userRouter.post('/incrementItems', incrementItemsOwned);

// localhost:8000/user/get
