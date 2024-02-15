import config from "../config";
import { User } from "../modules/User/user.model";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

type TUserRole = "user" | "manager" | "super-admin";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    //checking if the token is undefined
    if (!token) {
      throw new Error("Unauthorized Access");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    //checking if token is valid
    if (!decoded) {
      throw new Error("Unauthorized Access");
    }

    //checking if the token has expired
    if (decoded.exp) {
      const timeNow = Math.round(Date.now() / 1000);
      if (decoded.exp < timeNow) {
        throw new Error("Unauthorized Access");
      }
    }

    //verifying user from token data
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    //verifying the user role
    if (requiredRoles && !requiredRoles.includes(user.role)) {
      throw new Error("Unauthorized Access");
    }

    next();
  });
};
