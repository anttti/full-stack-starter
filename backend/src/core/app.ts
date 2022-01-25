import fastify, {
  FastifyHttpsOptions,
  FastifyInstance,
  FastifyServerOptions,
} from "fastify";
import type { Server as HttpsServer } from "https";
import type { Server as HttpServer } from "http";

import v1 from "../api";
import { prismaPlugin } from "../plugins/prisma";

const initApp = async (): Promise<FastifyInstance> => {
  const opts:
    | FastifyHttpsOptions<HttpsServer>
    | FastifyServerOptions<HttpServer> = {};
  const app = fastify(opts);
  app.register(prismaPlugin);
  await app.register(v1, { prefix: "/api/v1" });

  return app;
};

export default initApp;
