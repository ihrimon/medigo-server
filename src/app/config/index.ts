import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  client_local_url: process.env.CLIENT_LOCAL_URL,
  client_host_url: process.env.CLIENT_HOST_URL,
  database_uri: process.env.DATABASE_URI,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_token_expires: process.env.JWT_TOKEN_EXPIRES,
  jwt_refresh_secret_key: process.env.JWT_REFRESH_SECRET_KEY as string,
  jwt_refresh_token_expires: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret_key: process.env.CLOUDINARY_API_SECRET_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};

export * from './cloudinary.config';
export * from './multer.config';
export * from './stripe.config';
