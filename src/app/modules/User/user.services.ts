/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering user in database
const registerUserInDb = async (payload: Partial<TUser>) => {
  const result = await User.create({ ...payload, role: "user" });
  const filteredResult = await User.findById(result._id).select(
    "-password -__v",
  );

  return filteredResult;
};

// Logging in user and generating access token
const userLoginFromDb = async (payload: TUserLogin) => {
  const user = await User.findOne({
    username: payload.username,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordCheck = await bcrypt.compare(payload.password, user.password);

  if (!passwordCheck) {
    throw new Error("Incorrect password");
  }

  //Payload for jwt token
  const jwtPayload = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "15d",
  });

  const userData = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  return {
    userData,
    accessToken,
  };
};

const getAllUsersFromDb = async (query: Record<string, unknown>) => {
  const { email } = query;

  const queryObj: any = {};

  if (email) {
    queryObj.email = email;
  }

  queryObj.role = { $ne: "super-admin" };

  const result = await User.find(queryObj).select("-password -__v");
  return result;
};

const changeUserRoleInDb = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  }).select("-password -__v");
  return result;
};

export {
  registerUserInDb,
  userLoginFromDb,
  changeUserRoleInDb,
  getAllUsersFromDb,
};
