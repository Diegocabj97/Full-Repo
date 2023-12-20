import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  purchase_datetime: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

export const ticketModel = model("tickets", ticketSchema);
