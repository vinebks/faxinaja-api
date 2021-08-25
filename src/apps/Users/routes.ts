import { Router } from 'express';
import { authorize } from '@middlewares/authorize';
import * as controller from './UserController';
import { validateUserPayload } from './validator';

import 'express-async-errors';

const route = Router();

route.post('/', authorize, validateUserPayload, controller.create);
route.get('/', authorize, controller.findAll);
route.get('/:id', authorize, controller.findOne);
route.put('/:id', authorize, controller.update);
route.delete('/:id', authorize, controller.deleteOne);

export default route;
