import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { registerUserInDb, userLoginFromDb } from "./user.services";

const registerUser = catchAsync(async (req, res) => {
  const result = await registerUserInDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User registered successfully",
    user: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const { userData, accessToken } = await userLoginFromDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: userData,
      token: accessToken,
    },
  });
});

export { registerUser, userLogin };
