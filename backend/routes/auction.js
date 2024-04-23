import express from "express";
import { createAuction, getAllAuctions, getAuction } from "../controllers/auction.js";
// import { updateAuction} from "../controllers/auction.js";


export const auctionRouter = express.Router();


auctionRouter.get("/", getAllAuctions);
auctionRouter.post("/get", getAuction);
auctionRouter.post("/create", createAuction);
// auctionRouter.post("/update", updateAuction);


// localhost:8000/auction/create



