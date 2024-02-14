import { z } from "zod";

const userValidationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const userLoginValidationSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export { userValidationSchema, userLoginValidationSchema };
