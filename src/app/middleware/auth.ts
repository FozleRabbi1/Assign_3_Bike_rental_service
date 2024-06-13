import httpStatus from 'http-status';
import { TRole } from '../Modules/Users/User.interface';
import { User } from '../Modules/Users/User.model';
import config from '../config';
import { AppError } from '../errors/AppErrors';
import { catchAsync } from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const Auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const authToken = req.headers.authorization;
    const token = authToken?.split(' ')[1];

    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorize!!!');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};
