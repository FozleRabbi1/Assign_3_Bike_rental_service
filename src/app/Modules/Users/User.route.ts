import express from 'express';
import { userController } from './User.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from './User.validation';
import { AuthValidation } from '../Auth/Auth.AuthValidation';
import { AuthController } from '../Auth/Auth.controller';

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

export const SignUpRoute = router;
