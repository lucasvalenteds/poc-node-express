import Server, { Router, Express } from "express";

export function createExpressServer(router: Router): Express {
  const app: Express = Server();

  app.use(Server.urlencoded({ extended: false }));
  app.use(Server.json());

  app.use(router);

  return app;
}
