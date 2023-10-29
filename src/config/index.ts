import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_pass: process.env.DEFAULT_PASS,
  default_Faculty: process.env.DEFAULT_FACULTY_PASS,
  default_Admin: process.env.DEFAULT_ADMIN_PASS,
  bycrypt_sault_round: process.env.BCRYPT_SAULT_ROUND,
  env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
