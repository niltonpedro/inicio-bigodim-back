import { Router } from 'express';

const routes = Router();

routes.get('/', (resquest, response) =>
  response.json({
    message: 'Projeto rodando na porta 3333',
  }),
);

export default routes;
