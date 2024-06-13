import { Router } from 'express';
import { AuthRoute } from '../Modules/Users/User.route';

const router = Router();

const moduleRoutes = [{ path: '/auth', route: AuthRoute }];

moduleRoutes.forEach((pathRouter) =>
  router.use(pathRouter.path, pathRouter.route),
);

export default router;
