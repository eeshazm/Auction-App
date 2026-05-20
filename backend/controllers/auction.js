import { Auction } from "../models/auction.js";

export const getAllAuctions = async (req, res) => {
  try {
      const auctions = await Auction.find();
      return res.status(200).json({message:"fetch successful", auctions });
  } catch (error) {
      return res.status(500).json({ error: `fetch failed: ${error.message}` });
  }
};

export const getAuction = async (req, res) => {
  try {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ error: "ID required" });
      }

      const auction = await Auction.findById(id);
      if (!auction) {
          return res.status(404).json({ error: "Auction not found" });
      }

      return res.status(200).json({ message:"Auction found",auction });
  } catch (error) {
      return res.status(500).json({ error: `Failed to fetch: ${error.message}` });
  }
};

export const createAuction = async (req, res) => {
  try{
      const {title,description, startingPrice, startingTime, endingTime } = req.body;

      if (!title || !description || !startingPrice || !startingTime || !endingTime) {
          return res.status(400).json({ error: "All fields are required" });
      }
      const convertedStartTime = new Date(startingTime);
      const convertedEndTime = new Date(endingTime);

      if (!isValidDate(convertedStartTime) || !isValidDate(convertedEndTime) || convertedEndTime <= convertedStartTime) {
        return res.status(400).json({ error: "Invalid start or end time format" });
    }

      const auction = await Auction.create({title,description,startingPrice,currentPrice: startingPrice, startingTime: convertedStartTime, endingTime: convertedEndTime, status: "Ongoing",highestBidder: null});
      return res.status(201).json({message: "Auction created successfully", auction});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};


export const updateAuction = async (req, res) => {
    const { auctionId, bidAmount } = req.body;

    try {
        const auction = await Auction.findById(auctionId);

        if (!auction) {
            return res.status(404).json({ error: "Auction not found" });
        }
        if (bidAmount <= auction.currentPrice) {
            return res.status(400).json({ error: "Bid must be greater than current price" });
        }
        auction.currentPrice = bidAmount;
        await auction.save();

        return res.status(200).json({ message: "Auction updated successfully", auction });
    } catch (error) {
        return res.status(500).json({ error: `Failed to update auction: ${error.message}` });
    }
};