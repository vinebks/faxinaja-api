import { Router, Request, Response } from 'express';
import { setup, serve } from 'swagger-ui-express';

import SwaggerDocument from '@middlewares/swagger';

class SwaggerRoutes {
  async load(): Promise<Router> {
    const swaggerRoute = Router();
    const document = await SwaggerDocument.load();
    swaggerRoute.use('/faxinaja-api/api-docs', serve);
    swaggerRoute.get('/faxinaja-api/api-docs', setup(document));
    swaggerRoute.get(
      '/faxinaja-api/api-docs.json',
      (_: Request, res: Response) => res.json(document)
    );

    return swaggerRoute;
  }
}

export default new SwaggerRoutes();
