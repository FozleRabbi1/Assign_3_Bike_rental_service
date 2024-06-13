import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { ValidationRantalSchema } from './Booking.validation';
import { RentalController } from './Booking.controller';
import { Auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/',
  Auth('admin', 'user'),
  validateRequest(ValidationRantalSchema.RentalValidationSchema),
  RentalController.createRental,
);

export const RentalRoute = router;
