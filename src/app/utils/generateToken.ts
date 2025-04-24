import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

interface IJwtPayload {
  userId: Types.ObjectId; 
  name: string;
  email: string; 
  role: string 
}

export const generateToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};
