import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import validator from "validator";


export const createUser = async (req,res) => {
  try{
    const {username,password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }


    const exists = await User.findOne({ username })

    if (exists) {
        return res.json({message: "Username already in use"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({username,password : hashedPassword, itemsOwned: 0, auctionsCreated: []});
    return res.status(201).json({message: "Signup successful", user});
    }
    catch (error){
        return res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username }).populate('auctionsCreated');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User found', user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAuctions = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username }).populate('auctionsCreated');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { auctionsCreated } = user;
    return res.status(200).json({ message: 'Auctions create by user fetched', auctionsCreated });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const incrementItemsOwned = async (req, res) => {
    try {
      const { username } = req.body;
  
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.itemsOwned += 1;
      await user.save();

      return res.status(200).json({ message: "Items owned incremented successfully", user});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const updateAuctionsCreated = async (req, res) => {
    try {
      const { username, auctionId } = req.body;

      if (!username || !auctionId) {
        return res.status(400).json({ error: "Username and auctionId are required" });
      }

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.auctionsCreated.push(auctionId);
      await user.save();

      return res.status(200).json({ message: "Auction added to auctionsCreated", user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };