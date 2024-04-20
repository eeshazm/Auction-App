import mongoose from 'mongoose';
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
    auctionsCreated:{
        type:Number,
        required: true,
        min: 0
    },

})

export const User = mongoose.model("User", userSchema);