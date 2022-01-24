import type { FastifyPluginAsync } from "fastify";

import { healthCheck } from "./handlers";
import { healthCheckResponseSchema, HealthCheckRoute } from "./schemas";

const routes: FastifyPluginAsync = (instance) => {
  /**
   * @api {GET} /healthcheck Check service health
   * @apiName HealthCheck
   * @apiGroup HealthCheck
   * @apiVersion 1.0.0
   *
   * @apiSuccess (200) {HealthCheckResponse} Static response indicating success
   */
  instance.route<HealthCheckRoute>({
    method: "GET",
    url: "/",
    handler: healthCheck,
    config: {
      secure: false,
    },
    schema: {
      response: {
        200: healthCheckResponseSchema,
      },
    },
  });

  return Promise.resolve();
};

export default routes;
