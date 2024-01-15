import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
const productSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: [],
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
});
productSchema.plugin(paginate);
export const productModel = model("products", productSchema);
