import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { createSaleInDb, getSalesFromDb } from "./sale.services";

const createSale = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await createSaleInDb(id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Sale done successfully",
    sale: result,
  });
});

const getSales = catchAsync(async (req, res) => {
  const { historyType } = req.params;
  const result = await getSalesFromDb(historyType);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Sales fetched successfully",
    sales: result,
  });
});

export { createSale, getSales };
