import type { FastifyPluginAsync } from 'fastify'

import healthCheckRoutes from './features/healthCheck/routes'
import userRoutes from './features/user/routes'

const api: FastifyPluginAsync = async (instance) => {
  await instance.register(healthCheckRoutes, { prefix: '/healthcheck' })
  await instance.register(userRoutes, { prefix: '/user' })
}

export default api
