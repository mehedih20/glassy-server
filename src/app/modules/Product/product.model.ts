import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
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
  frameMaterial: {
    type: String,
    enum: ["metal", "plastic", "acetate"],
    required: true,
  },
  frameShape: {
    type: String,
    enum: ["rectangular", "round", "cat-eye"],
    required: true,
  },
  lensType: {
    type: String,
    enum: ["single-vision", "bifocal", "progressive"],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["men", "women", "unisex"],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  templeLength: {
    type: Number,
    required: true,
  },
  bridgeSize: {
    type: Number,
    required: true,
  },
});

export const Product = model<TProduct>("Product", productSchema);
