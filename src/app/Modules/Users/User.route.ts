import express from 'express';
import { userController } from './User.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from './User.validation';
import { AuthValidation } from '../Auth/Auth.AuthValidation';
import { AuthController } from '../Auth/Auth.controller';
import { Auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.UserValidationSchema),
  userController.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

router.get('/', Auth('admin', 'user'), userController.getUser);
router.put(
  '/',
  Auth('admin', 'user'),
  validateRequest(UserValidation.UserUpdateValidationSchema),
  userController.updateUser,
);

export const UsersRoute = router;
