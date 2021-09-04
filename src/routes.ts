import { Router } from 'express';

import UserRoutes from '@apps/Users/routes';
import AuthRoutes from '@apps/Auth/routes';
import DemandRoutes from '@apps/Demands/routes';

const route = Router();

route.use('/users', UserRoutes);
route.use('/auth', AuthRoutes);
route.use('/demand', DemandRoutes);

export default route;
