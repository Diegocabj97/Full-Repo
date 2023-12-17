import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
  products: {
    type: [
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
    total: {
      type: Number,
      required: true,
    },
  },
});

// Corregir la ruta de populate
cartSchema.pre("findOne", function () {
  this.populate("products._id");
});

// Parametro 1: Nombre de la coleccion - Parametro 2: Schema
export const CartModel = model("carts", cartSchema);
