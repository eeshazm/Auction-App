import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
// import { auctionRouter } from "./routes/auctions.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
// app.use("api/auctions",auctionRouter)