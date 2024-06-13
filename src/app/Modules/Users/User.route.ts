import express from 'express';
import { userController } from './User.controller';

const router = express.Router();

router.post('/signup', userController.createUser);

export const AuthRoute = router;
