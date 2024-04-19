import mongoose from 'mongoose';
const Schema = mongoose.Schema

const auctionSchema = new Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: Number,
        required: true

    },
    startingPrice: {
        type: Number,
        required: true,
        min: 0

    },
    currentPrice: {
        type: String,
        required: true,
        min: 0

    },
    startingTime: {
        type: Date,
        required: true

      },
    endingTime: {
        type: Date,
        required: true,
        validate: {
          validator: function(value) {
            return value > this.startingTime;
          },
          message: 'Ending time before starting time'

        }
    },
    status: {
        type: String,
        required: false

    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
})

export const Auction = mongoose.model("Auctions", auctionSchema);