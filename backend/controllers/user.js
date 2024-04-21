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
            throw Error('Username already in use')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username,password : hashedPassword, itemsOwned: 0, auctionsCreated: 0});
        return res.status(201).json("Signup successful");
    }
    catch (error){
        return res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ username });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json("Username and password are required");
      }
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json("Invalid password");
      }

      return res.status(200).json("Login successful");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };