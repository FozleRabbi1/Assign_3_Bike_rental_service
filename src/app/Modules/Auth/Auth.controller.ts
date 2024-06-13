import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LoginUserService } from './Auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await LoginUserService.loginUserService(req.body);
  const { userData, accessToken } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: accessToken,
    data: userData,
  });
});

export const AuthController = {
  loginUser,
};
