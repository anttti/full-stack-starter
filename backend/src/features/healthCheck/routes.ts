import type { FastifyPluginAsync } from 'fastify'

import { healthCheck } from './handlers'
import { healthCheckResponseSchema, HealthCheckRoute } from './schemas'

const routes: FastifyPluginAsync = (instance) => {
  instance.route<HealthCheckRoute>({
    method: 'GET',
    url: '/',
    handler: healthCheck,
    config: {
      secure: false,
    },
    schema: {
      tags: ['Healthcheck'],
      summary: 'Check if server & DB are up',
      description: 'To database and back again!',
      response: {
        200: healthCheckResponseSchema,
      },
    },
  })

  return Promise.resolve()
}

export default routes
