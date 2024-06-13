import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { UserService } from './User.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserInto(req?.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserService.getUserFormBD(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserService.updateUserFormBD(email, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const userController = { createUser, getUser, updateUser };
