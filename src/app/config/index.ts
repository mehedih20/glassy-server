import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  super_admin_username: process.env.SUPER_ADMIN_USERNAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_pass: process.env.SUPER_ADMIN_PASSWORD,
};
