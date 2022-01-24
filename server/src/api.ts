import type { FastifyPluginAsync } from "fastify";

import healthCheckRoutes from "./features/healthCheck/routes";

const api: FastifyPluginAsync = async (instance) => {
  await instance.register(healthCheckRoutes, { prefix: "/healthcheck" });
};

export default api;
