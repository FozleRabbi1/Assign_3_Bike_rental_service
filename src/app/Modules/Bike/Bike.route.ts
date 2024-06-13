import express from 'express';
import { Auth } from '../../middleware/auth';
import { BikeController } from './Bike.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { BikeValidationSchema } from './Bike.validation';

const router = express.Router();

router.post(
  '/',
  Auth('admin'),
  validateRequest(BikeValidationSchema.BikeAddedSchema),
  BikeController.addedBike,
);
router.put(
  '/:id',
  Auth('admin'),
  validateRequest(BikeValidationSchema.BikeUpdateSchema),
  BikeController.updateBike,
);
router.delete('/:id', Auth('admin'), BikeController.deletedBike);
router.get('/', BikeController.getAllBike);

export const BikeRoute = router;
