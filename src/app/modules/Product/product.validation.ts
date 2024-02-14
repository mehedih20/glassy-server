import { z } from "zod";

const productValidationSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  frameMaterial: z.enum(["metal", "plastic", "acetate"]),
  frameShape: z.enum(["rectangular", "round", "cat-eye"]),
  lensType: z.enum(["single-vision", "bifocal", "progressive"]),
  brand: z.string(),
  gender: z.enum(["men", "women", "unisex"]),
  color: z.string(),
  templeLength: z.number(),
  bridgeSize: z.number(),
});

const updateProductValidationSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  frameMaterial: z.enum(["metal", "plastic", "acetate"]).optional(),
  frameShape: z.enum(["rectangular", "round", "cat-eye"]).optional(),
  lensType: z.enum(["single-vision", "bifocal", "progressive"]).optional(),
  brand: z.string().optional(),
  gender: z.enum(["men", "women", "unisex"]).optional(),
  color: z.string().optional(),
  templeLength: z.number().optional(),
  bridgeSize: z.number().optional(),
});

export { productValidationSchema, updateProductValidationSchema };
