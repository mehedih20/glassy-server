import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import {
  createProductInDb,
  deleteProductFromDb,
  deleteProductInBulkFromDb,
  getDistinctValuesFromDb,
  getHighestPriceFromDB,
  getProductsFromDb,
  updateProductInDb,
} from "./product.services";

const createProduct = catchAsync(async (req, res) => {
  const result = await createProductInDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Product created successfully",
    product: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await getProductsFromDb(req.query, token as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Products fetched successfully",
    meta: result.meta,
    products: result.data,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const result = await deleteProductFromDb(id, token as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Product deleted successfully",
    product: result,
  });
});

const deleteProductInBulk = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await deleteProductInBulkFromDb(req.body, token as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Products deleted successfully",
    product: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const result = await updateProductInDb(id, req.body, token as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Product updated successfully",
    product: result,
  });
});

const getDistinctValues = catchAsync(async (req, res) => {
  const result = await getDistinctValuesFromDb();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Distinct values fetched successfully",
    data: result,
  });
});

const getHighestPrice = catchAsync(async (req, res) => {
  const result = await getHighestPriceFromDB();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Highest price fetched successfully",
    result,
  });
});

export {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  deleteProductInBulk,
  getDistinctValues,
  getHighestPrice,
};
