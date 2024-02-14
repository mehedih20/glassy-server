import { Router } from "express";
import validateData from "../../middlewares/validateData";
import {
  userLoginValidationSchema,
  userValidationSchema,
} from "./user.validation";
import { registerUser, userLogin } from "./user.controller";

const router = Router();

router.post("/auth/register", validateData(userValidationSchema), registerUser);

router.post("/auth/login", validateData(userLoginValidationSchema), userLogin);

export const UserRouter = router;
