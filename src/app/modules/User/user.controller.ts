import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import {
  changeUserRoleInDb,
  getAllUsersFromDb,
  registerUserInDb,
  userLoginFromDb,
} from "./user.services";

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

const getAllUsers = catchAsync(async (req, res) => {
  const result = await getAllUsersFromDb(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

const changeUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await changeUserRoleInDb(id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User role changed successfully",
    data: result,
  });
});

export { registerUser, userLogin, changeUserRole, getAllUsers };
