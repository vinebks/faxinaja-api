import { Router } from 'express';
import { authorize } from '@middlewares/authorize';
import * as controller from './UserController';
import { validateUserPayload } from './validator';

import 'express-async-errors';

const route = Router();

route.post('/create-user', validateUserPayload, controller.create);
route.get('/list-users', controller.findAll);
route.get('/find-user/:id', authorize, controller.findOne);
route.put('/update-user/:id', authorize, controller.update);
route.delete('/delete-user/:id', authorize, controller.deleteOne);

export default route;
