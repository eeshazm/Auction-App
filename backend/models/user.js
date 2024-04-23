import mongoose from 'mongoose';
import { Auction } from "./auction.js"
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    itemsOwned:{
        type:Number,
        required: true,
        min: 0
    },
    auctionsCreated:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Auction",
        required: true
    }],
})

export const User = mongoose.model("User", userSchema);