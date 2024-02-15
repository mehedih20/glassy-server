/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import { User } from "../User/user.model";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import { stringSplit } from "./product.utils";
import jwt, { JwtPayload } from "jsonwebtoken";

// Creating product
const createProductInDb = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// Fetching products with filtering
const getProductsFromDb = async (
  query: Record<string, unknown>,
  token: string,
) => {
  //Extracting query fields
  const {
    sortBy,
    sortOrder,
    frameMaterial,
    frameShape,
    lensType,
    brand,
    price,
    gender,
    color,
    templeLength,
    bridgeSize,
    searchTerm,
  } = query;

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  // Formatting sort object
  const sortObj: any = {};
  const sortByField = ["name", "price"];

  if (sortBy && !sortOrder && sortByField.includes(sortBy as string)) {
    sortObj[sortBy as string] = "asc";
  } else if (sortOrder && sortBy) {
    sortObj[sortBy as string] = sortOrder;
  } else if (sortOrder && !sortBy) {
    sortObj.price = sortOrder;
  }

  // Formatting filter object
  const querObj: any = {};

  if (frameMaterial)
    querObj.frameMaterial = { $in: stringSplit(frameMaterial as string) };

  if (frameShape)
    querObj.frameShape = { $in: stringSplit(frameShape as string) };

  if (lensType) querObj.lensType = { $in: stringSplit(lensType as string) };

  if (brand) querObj.brand = { $in: stringSplit(brand as string) };

  if (gender) querObj.gender = { $in: stringSplit(gender as string) };

  if (color) querObj.color = { $in: stringSplit(color as string) };

  if (templeLength)
    querObj.templeLength = { $in: stringSplit(templeLength as string) };

  if (bridgeSize)
    querObj.bridgeSize = { $in: stringSplit(bridgeSize as string) };

  if (price) {
    const prices = stringSplit(price as string);
    querObj.price = { $gte: Number(prices[0]), $lte: Number(prices[1]) };
  }

  if (searchTerm) {
    querObj.name = { $regex: searchTerm, $options: "i" };
  }
  if (decoded) {
    const user = await User.findOne({ email: decoded.email });
    if (user?.role === "user") {
      querObj.createdBy = user.email;
    }
  }

  // Making query to database
  const searchQuery = await Product.find(querObj).sort(sortObj).select("-__v");

  // Making the meta data
  const metaData = {
    total: (await Product.find(querObj)).length,
  };

  return { meta: metaData, data: searchQuery };
};

// Delete single product
const deleteProductFromDb = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

// Delete products in bulk
const deleteProductInBulkFromDb = async (payload: string[]) => {
  const result = await Product.deleteMany({ _id: { $in: payload } });
  return result;
};

// Updating the product
const updateProductInDb = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// Getting distinct values required for filtering
const getDistinctValuesFromDb = async () => {
  const distinctBrands = await Product.distinct("brand");
  const distinctColors = await Product.distinct("color");
  const distinctTempleLengths = await Product.distinct("templeLength");
  const distinctBridgeSizes = await Product.distinct("bridgeSize");

  return [
    {
      title: "Brand",
      values: distinctBrands,
    },
    {
      title: "Color",
      values: distinctColors,
    },
    {
      title: "Temple length",
      values: distinctTempleLengths,
    },
    {
      title: "Bridge size",
      values: distinctBridgeSizes,
    },
  ];
};

// Fetching the highest price for price range in filtering options
const getHighestPriceFromDB = async () => {
  const result = await Product.findOne().sort({ price: -1 }).select("price");
  return result;
};

export {
  createProductInDb,
  getProductsFromDb,
  deleteProductFromDb,
  deleteProductInBulkFromDb,
  updateProductInDb,
  getDistinctValuesFromDb,
  getHighestPriceFromDB,
};
