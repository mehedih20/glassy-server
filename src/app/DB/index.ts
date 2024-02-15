import config from "../config";
import { User } from "../modules/User/user.model";

const superUser = {
  username: config.super_admin_username,
  email: config.super_admin_email,
  password: config.super_admin_pass,
  role: "super-admin",
};

const seedSuperAdmin = async () => {
  const checkSuperAdminExists = await User.findOne({ role: "super-admin" });

  if (!checkSuperAdminExists) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
