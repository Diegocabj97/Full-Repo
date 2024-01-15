import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { CartModel } from "./cart.models.js";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  } /* 
  age: {
    required: true,
    type: Number,
  }, */,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  thumbnail: [{ type: String }],
  role: {
    type: String,
    default: "user",
  },
  documents: [
    {
      name: {
        type: String,
      },
      reference: {
        type: String,
      },
    },
  ],
  last_connection: {
    type: Date,
    default: Date.now(),
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
});
userSchema.plugin(paginate);

userSchema.pre("save", async function (next) {
  try {
    const newCart = await CartModel.create({ total: 0 });
    this.cart = newCart._id;
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware o función
  }
});
//Parametro 1: Nombre de la coleccion - Parametro 2:Schema
export const userModel = model("users", userSchema);
