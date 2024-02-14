/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../Product/product.model";
import { TSale } from "./sale.interface";
import { Sale } from "./sale.model";

// Creating a sale
const createSaleInDb = async (id: string, payload: TSale) => {
  const saleResult = await Sale.create(payload);
  if (saleResult) {
    const product = await Product.findById(id);

    if (product) {
      const newQuantity = product.quantity - payload.quantity;

      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
          quantity: newQuantity,
        },
        {
          new: true,
        },
      );
      if (updatedProduct?.quantity === 0) {
        await Product.findByIdAndDelete(id);
      }
    }
  }
  return saleResult;
};

// Get sales history of specific time
const getSalesFromDb = async (param: string) => {
  const queryObj: any = {};

  const dateToady = new Date().toISOString().split("T")[0];

  const weeklyDate = new Date(dateToady);
  weeklyDate.setDate(new Date(dateToady).getDate() - 7);

  const monthlyDate = new Date(dateToady);
  monthlyDate.setDate(new Date(dateToady).getDate() - 30);

  const yearlyDate = new Date(dateToady);
  yearlyDate.setDate(new Date(dateToady).getDate() - 365);

  if (param === "daily") {
    queryObj.dateOfSale = {
      $eq: dateToady,
    };
  } else if (param === "weekly") {
    queryObj.dateOfSale = {
      $lte: dateToady,
      $gte: weeklyDate.toISOString().split("T")[0],
    };
  } else if (param === "monthly") {
    queryObj.dateOfSale = {
      $lte: dateToady,
      $gte: monthlyDate.toISOString().split("T")[0],
    };
  } else {
    queryObj.dateOfSale = {
      $lte: dateToady,
      $gte: yearlyDate.toISOString().split("T")[0],
    };
  }

  const result = await Sale.find(queryObj).select("-__v -createdAt -updatedAt");

  return result;
};

export { createSaleInDb, getSalesFromDb };
