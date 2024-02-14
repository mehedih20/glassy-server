import { z } from "zod";

const saleValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  brand: z.string(),
  quantity: z.number(),
  buyerName: z.string(),
  dateOfSale: z.string(),
});

export { saleValidationSchema };
