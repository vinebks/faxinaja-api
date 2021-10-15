import { Router } from 'express';
import { authorize } from '@middlewares/authorize';
import * as controller from './AmUsersController';

import 'express-async-errors';

const route = Router();

route.post('/create-amusers', controller.create);
route.get('/list-amusers/:setor', controller.findAll);
route.get('/find-amusers/:userId', controller.findOne);
route.post('/update-salary/:userId', controller.updateSalary);
route.post('/create-comment/:userId', authorize, controller.createNewComment);
route.post('/parse-salary', controller.updateAllSalarys);
route.get('/get-balance/:document', controller.getBalance);

export default route;
