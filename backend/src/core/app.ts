import fastify, { FastifyInstance } from 'fastify'
import { fastifyPostgres } from 'fastify-postgres'
import { fastifySwagger } from 'fastify-swagger'

import v1 from '../api'
import { getConfig, isDevEnvironment } from './config'

const host = getConfig('HOST', 'localhost')
const port = getConfig('PORT', '4000')
const dbHost = getConfig('PG_HOST')
const dbPort = getConfig('PG_PORT')
const user = getConfig('PG_USER')
const password = getConfig('PG_PASSWORD')
const database = getConfig('PG_DATABASE')
const connectionString = `postgres://${user}:${password}@${dbHost}:${dbPort}/${database}`

const initApp = async (): Promise<FastifyInstance> => {
  const app = fastify({
    // https://www.fastify.io/docs/latest/Reference/Logging/
    logger: {
      prettyPrint: isDevEnvironment
        ? {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          }
        : false,
    },
  })
  await app.register(fastifyPostgres, {
    connectionString,
  })
  if (isDevEnvironment) {
    await app.register(fastifySwagger, {
      routePrefix: '/documentation',
      exposeRoute: true,
      swagger: {
        info: {
          title: 'Example API',
          description: 'API documentation',
          version: '0.0.1',
        },
        host: `http://${host}:${port}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'Healthcheck', description: 'Healthcheck endpoints' },
          { name: 'User', description: 'User endpoints' },
        ],
      },
    })
  }
  await app.register(v1, { prefix: '/api/v1' })

  return app
}

export default initApp
