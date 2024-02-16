import { Router } from "express";
import validateData from "../../middlewares/validateData";
import {
  roleChangeValidation,
  userLoginValidationSchema,
  userValidationSchema,
} from "./user.validation";
import {
  changeUserRole,
  getAllUsers,
  registerUser,
  userLogin,
} from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/auth/register", validateData(userValidationSchema), registerUser);

router.post("/auth/login", validateData(userLoginValidationSchema), userLogin);

router.get("/users", auth("super-admin"), getAllUsers);

router.put(
  "/auth/change-user-role/:id",
  auth("super-admin"),
  validateData(roleChangeValidation),
  changeUserRole,
);

export const UserRouter = router;
