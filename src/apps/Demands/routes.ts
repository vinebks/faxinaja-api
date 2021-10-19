import { Router } from 'express';
import * as controller from './DemandController';
import { authorize } from '@middlewares/authorize';

import 'express-async-errors';

const route = Router();

route.post('/create-demand', authorize, controller.createDemand);
route.get('/find-my-demands', authorize, controller.findMyDemands);
route.get('/delete-my-demands', authorize, controller.deleteDemands);
route.get('/find-open-demands', authorize, controller.findOpenDemands);
route.post('/assign-demand/:demandId', authorize, controller.assignDemandToProfessional);
route.get('/find-my-made-demands', authorize, controller.findMyMadeDemands);
route.post('/finish-demand/:demandId', authorize, controller.finishOrder);


export default route;
