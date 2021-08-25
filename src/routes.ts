import { Router } from 'express';

import UserRoutes from '@apps/Users/routes';
import AuthRoutes from '@apps/Auth/routes';

const route = Router();

route.use('/users', UserRoutes);
route.use('/auth', AuthRoutes);

export default route;
