import config from '../../config';
import { checkPassword } from '../../utils/checkPassword';
import { CustomError } from '../../utils/CustomError';
import { generateHashedPassword } from '../../utils/generateHashPass';
import { generateToken } from '../../utils/generateToken';
import { verifyToken } from '../../utils/verifyToken';
import { Customer } from '../customer/customer.model';
import { IUser } from './user.interface';
import { User } from './user.model';

// create user
const registerUserIntoDB = async (payload: IUser) => {
  const { name, email, password: userPassword } = payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new CustomError(409, 'User already exist!');

  const hashedPassword = await generateHashedPassword(
    userPassword,
    Number(config.bcrypt_salt_round)
  );

  const newUser = await User.create({ ...payload, password: hashedPassword });
  await Customer.create({ fullName: name, email, user: newUser._id });

  return newUser;
};

// login user
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  let user = await User.findOne({ email });
  if (!user) throw new CustomError(404, 'User doesn"t exists!');

  const isMatched = await checkPassword(password, user.password);

  if (!isMatched) throw new CustomError(400, 'Incorrect email or password.');

  const jwtPayload = {
    userId: user?._id,
    name: user?.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_secret_key as string,
    config.jwt_token_expires as string
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret_key as string,
    config.jwt_refresh_token_expires as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// refresh token generate
const refreshToken = async (token: string) => {
  const { email } = verifyToken(token, config.jwt_refresh_secret_key);

  const user = await User.findOne({ email });
  if (!user) throw new CustomError(404, 'User doesn"t exists!');

  const jwtPayload = {
    userId: user?._id,
    name: user?.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_secret_key as string,
    config.jwt_token_expires as string
  );

  return {
    accessToken,
  };
};

// change user status
const changeUserStatus = async (id: string, payload: { status: string }) => {
  return await User.findByIdAndUpdate(id, payload, { new: true });
};

export const userServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  refreshToken,
  changeUserStatus,
};
