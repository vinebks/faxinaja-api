import { Router } from 'express';
import * as controller from './DemandController';
import { authorize } from '@middlewares/authorize';

import 'express-async-errors';

const route = Router();

route.post('/create-demand', authorize, controller.createDemand);
route.get('/find-my-demands', authorize, controller.findMyDemands);
route.get('/delete-my-demands', authorize, controller.deleteDemands);
route.get('/find-open-demands', authorize, controller.findOpenDemands);
route.get('/assign-demand/:demandId', authorize, controller.assignDemandToProfessional);

export default route;
