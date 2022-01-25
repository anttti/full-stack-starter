import type { RouteHandler } from "fastify";

import { HealthCheckRoute } from "./schemas";

/**
 * Health check endpoint
 */
export const healthCheck: RouteHandler<HealthCheckRoute> = async (_req, res) =>
  res.send({ ok: true });
