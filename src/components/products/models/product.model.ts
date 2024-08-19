import { IProduct } from "../types/Product.types";
import { Schema, model } from "mongoose";

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    enum: [
      "Web Landing",
      "Web Pro",
      "Web Business",
      "Ecommerce",
      "System",
      "Hosting",
    ],
    required: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  expirationDate: { type: Date },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

export default model<IProduct>("Product", ProductSchema);