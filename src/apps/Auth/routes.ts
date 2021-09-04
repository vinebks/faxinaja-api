import { Router } from 'express';

import * as controller from './AuthController';
import { validateAuthPayload } from './validator';

import 'express-async-errors';

const route = Router();

route.post('/', validateAuthPayload, controller.auth);

export default route;
