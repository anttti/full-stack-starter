import fastify, { FastifyInstance } from "fastify";
import { fastifyPostgres } from "fastify-postgres";

import v1 from "../api";
import { getConfig } from "./config";

const initApp = async (): Promise<FastifyInstance> => {
  const app = fastify();
  await app.register(v1, { prefix: "/api/v1" });
  app.register(fastifyPostgres, {
    connectionString: getConfig("DATABASE_URL"),
  });

  return app;
};

export default initApp;
