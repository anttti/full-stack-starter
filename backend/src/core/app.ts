import fastify, { FastifyInstance } from "fastify";
import { fastifyPostgres } from "fastify-postgres";

import v1 from "../api";
import { getConfig } from "./config";

const host = getConfig("PG_HOST");
const port = getConfig("PG_PORT");
const user = getConfig("PG_USER");
const password = getConfig("PG_PASSWORD");
const database = getConfig("PG_DATABASE");
const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;

const initApp = async (): Promise<FastifyInstance> => {
  const app = fastify();
  await app.register(v1, { prefix: "/api/v1" });
  app.register(fastifyPostgres, {
    connectionString,
  });

  return app;
};

export default initApp;
