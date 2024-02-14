import { Router } from "express";
import validateData from "../../middlewares/validateData";
import { saleValidationSchema } from "./sale.validation";
import { createSale, getSales } from "./sale.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-sale/:id",
  auth(),
  validateData(saleValidationSchema),
  createSale
);

router.get("/sales/:historyType", auth(), getSales);

export const SaleRouter = router;
