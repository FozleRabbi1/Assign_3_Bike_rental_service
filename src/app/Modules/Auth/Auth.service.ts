import httpStatus from 'http-status';
import { TLoginUser } from './Auth.interface';
import { AppError } from '../../errors/AppErrors';
import { User } from '../Users/User.model';
import { createToken } from './Auth.utils';
import config from '../../config';
import bcrypt from 'bcrypt';

const loginUserService = async (paylod: TLoginUser) => {
  const userData = await User.findOne({ email: paylod.email });

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const isPasswordMatched = await bcrypt.compare(
    paylod?.password,
    userData?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'password is not matched');
  }

  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {
    accessToken,
    userData,
  };
};

export const LoginUserService = {
  loginUserService,
};
