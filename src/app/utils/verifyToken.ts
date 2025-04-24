import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = (token: string, secret: string) => {
 try {
   return jwt.verify(token, secret) as JwtPayload;
 } catch (error) {
   throw new Error('Invalid or expired token');
 }
}  
  
