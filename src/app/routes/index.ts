import { Router } from 'express';
import { UsersRoute } from '../Modules/Users/User.route';
import { BikeRoute } from '../Modules/Bike/Bike.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: UsersRoute },
  { path: '/users', route: UsersRoute },
  { path: '/bikes', route: BikeRoute },
];

moduleRoutes.forEach((pathRouter) =>
  router.use(pathRouter.path, pathRouter.route),
);

export default router;
