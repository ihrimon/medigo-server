import config from '../config';
import { TUserRole } from '../interface';
import { User } from '../modules/user/user.model';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { CustomError } from '../utils/CustomError';
import { verifyToken } from '../utils/verifyToken';

const isAuth =
  (...requiredRole: TUserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log('token in server', token);

    if (!token) throw new CustomError(401, 'You are not authorized!');

    try {
      const decoded = verifyToken(token, config.jwt_secret_key as string);

      const { role, email } = decoded;

      console.log(role, email);

      if (requiredRole && !requiredRole.includes(role))
        throw new CustomError(401, 'You are not authorized!');

      const user = await User.findOne({ email });
      if (!user) throw new CustomError(404, 'User doesn"t exists!');

      req.user = decoded;

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(
          new CustomError(400, 'Token has expired! Please login again.')
        );
      }
      return next(new CustomError(400, 'Invalid token!'));
    }
  };
export default isAuth;
