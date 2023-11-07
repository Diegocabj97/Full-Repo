import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { v4 as uuidv4 } from "uuid";
const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_dateTime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

ticketSchema.pre("save", async function (next) {
  try {
    if (!this.code) {
      this.code = uuidv4();
    }
  } catch (error) {
    next(error);
  }
});
//Parametro 1: Nombre de la coleccion - Parametro 2:Schema
export const ticketModel = model("tickets", ticketSchema);
