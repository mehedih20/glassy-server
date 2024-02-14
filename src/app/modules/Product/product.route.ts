import { Router } from "express";
import validateData from "../../middlewares/validateData";
import {
  productValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
import {
  createProduct,
  deleteProduct,
  deleteProductInBulk,
  getDistinctValues,
  getHighestPrice,
  getProducts,
  updateProduct,
} from "./product.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get("/products", auth(), getProducts);

router.post(
  "/create-product",
  auth(),
  validateData(productValidationSchema),
  createProduct,
);

router.delete("/delete-product/:id", auth(), deleteProduct);

router.delete("/delete-products", auth(), deleteProductInBulk);

router.put(
  "/update-product/:id",
  auth(),
  validateData(updateProductValidationSchema),
  updateProduct,
);

router.get("/distinct-values", auth(), getDistinctValues);

router.get("/highest-price", auth(), getHighestPrice);

export const ProductRouter = router;
