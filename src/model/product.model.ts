import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ProductInput {
  user: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("product", productSchema);

export default ProductModel;
