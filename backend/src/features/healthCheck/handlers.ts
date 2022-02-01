import type { RouteHandler } from "fastify";

import { HealthCheckRoute } from "./schemas";

export const healthCheck: RouteHandler<HealthCheckRoute> = async (_req, res) =>
  // TODO: SELECT 1 from DB
  res.send({ ok: true });
