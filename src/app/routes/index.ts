import { Router } from 'express';
import { UsersRoute } from '../Modules/Users/User.route';
import { BikeRoute } from '../Modules/Bike/Bike.route';
import { RentalRoute } from '../Modules/Booking/Booking.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: UsersRoute },
  { path: '/users', route: UsersRoute },
  { path: '/bikes', route: BikeRoute },
  { path: '/rentals', route: RentalRoute },
];

moduleRoutes.forEach((pathRouter) =>
  router.use(pathRouter.path, pathRouter.route),
);

export default router;
