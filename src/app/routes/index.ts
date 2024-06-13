import { Router } from 'express';
import { SignUpRoute } from '../Modules/Users/User.route';

const router = Router();

const moduleRoutes = [{ path: '/auth', route: SignUpRoute }];

moduleRoutes.forEach((pathRouter) =>
  router.use(pathRouter.path, pathRouter.route),
);

export default router;
