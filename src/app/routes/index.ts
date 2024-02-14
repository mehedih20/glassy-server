import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { ProductRouter } from "../modules/Product/product.route";
import { SaleRouter } from "../modules/Sale/sale.route";

const router = Router();

const allRouters = [UserRouter, ProductRouter, SaleRouter];

allRouters.forEach((route) => router.use(route));

export const BaseRouter = router;
