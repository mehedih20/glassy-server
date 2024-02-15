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

router.get("/products", auth("user", "manager", "super-admin"), getProducts);

router.post(
  "/create-product",
  auth("user", "manager", "super-admin"),
  validateData(productValidationSchema),
  createProduct,
);

router.delete(
  "/delete-product/:id",
  auth("user", "manager", "super-admin"),
  deleteProduct,
);

router.delete(
  "/delete-products",
  auth("user", "manager", "super-admin"),
  deleteProductInBulk,
);

router.put(
  "/update-product/:id",
  auth("user", "manager", "super-admin"),
  validateData(updateProductValidationSchema),
  updateProduct,
);

router.get(
  "/distinct-values",
  auth("user", "manager", "super-admin"),
  getDistinctValues,
);

router.get(
  "/highest-price",
  auth("user", "manager", "super-admin"),
  getHighestPrice,
);

export const ProductRouter = router;
