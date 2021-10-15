import { Router } from 'express';
import { authorize } from '@middlewares/authorize';
import * as controller from './AmUsersController';

import 'express-async-errors';

const route = Router();

route.post('/create-amusers', controller.create);
route.get('/list-amusers/:setor', controller.findAll);
route.get('/find-amusers/:userId', authorize, controller.findOne);

export default route;
