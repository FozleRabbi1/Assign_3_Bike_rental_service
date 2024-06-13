import { Router } from 'express';
import { UsersRoute } from '../Modules/Users/User.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: UsersRoute },
  { path: '/users', route: UsersRoute },
];

moduleRoutes.forEach((pathRouter) =>
  router.use(pathRouter.path, pathRouter.route),
);

export default router;
