import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import validator from "validator";
import jsonwebtoken from "jsonwebtoken";

const createToken = (_id) => {
    return jsonwebtoken.sign({_id}, process.env.SECRET_KEY, { expiresIn: '3d' })
  }

export const createUser = async (req,res) => {
    try{
        const {username,password} = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // if (!validator.isStrongPassword(password)) {
        //     throw Error('Password not strong enough')
        // }

        const exists = await User.findOne({ username })

        if (exists) {
            throw Error('Username already in use')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username,password : hashedPassword});
        const token = createToken(user._id)
        return res.status(201).json({ message: "Signup successful", username, token });
    }
    catch (error){
        return res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const token = createToken(user._id)
    return res.status(200).json({ username, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = createToken(user._id)
      return res.status(200).json({ message: "Login successful", username, token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };