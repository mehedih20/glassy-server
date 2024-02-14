import { Schema, model } from "mongoose";
import { TSale } from "./sale.interface";

const saleSchema = new Schema<TSale>(
  {
    productName: {
      type: String,
      required: true,
    },
    brand: {
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
    buyerName: {
      type: String,
      required: true,
    },
    dateOfSale: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Sale = model<TSale>("Sale", saleSchema);
