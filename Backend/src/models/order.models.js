import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
});

//Parametro 1: Nombre de la coleccion - Parametro 2:Schema
export const orderModel = model("Orders", orderSchema);
