import { Schema, model } from "mongoose";
import { TUser, TUserLogin } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

export const userLoginSchema = new Schema<TUserLogin>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<TUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "manager", "super-admin"],
  },
  password: {
    type: String,
    required: true,
  },
});

// Hashing the user password using pre hook and bcrypt
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<TUser>("User", userSchema);
