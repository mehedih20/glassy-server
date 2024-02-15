import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { createSaleInDb, getSalesFromDb } from "./sale.services";

const createSale = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await createSaleInDb(id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Product sold successfully",
    sale: result,
  });
});

const getSales = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const { historyType } = req.params;
  const result = await getSalesFromDb(historyType, token as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Sales history fetched successfully",
    sales: result,
  });
});

export { createSale, getSales };
