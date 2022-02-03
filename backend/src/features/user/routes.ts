import type { FastifyPluginAsync } from 'fastify'

import { createUser, getUserById, getUsers } from './handlers'
import {
  Route as GetUsersRoute,
  responseSchema as getUsersResponseSchema,
} from './schemas/getUsers'
import {
  Route as GetUserByIdRoute,
  responseSchema as getUserByIdResponseSchema,
  paramsSchema as getUserByIdParamsSchema,
} from './schemas/getUserById'
import {
  Route as CreateUserRoute,
  responseSchema as createUserResponseSchema,
  bodySchema as createUserBodySchema,
} from './schemas/createUser'

const routes: FastifyPluginAsync = (instance) => {
  instance.route<GetUsersRoute>({
    method: 'GET',
    url: '/',
    handler: getUsers,
    schema: {
      tags: ['User'],
      summary: 'Get all users',
      description: 'Retrieve all users',
      response: {
        200: getUsersResponseSchema,
      },
    },
  })

  instance.route<GetUserByIdRoute>({
    method: 'GET',
    url: '/:userId',
    handler: getUserById,
    schema: {
      tags: ['User'],
      summary: 'Get user by ID',
      description: 'Retrieve one user by ID',
      params: getUserByIdParamsSchema,
      response: {
        200: getUserByIdResponseSchema,
      },
    },
  })

  instance.route<CreateUserRoute>({
    method: 'POST',
    url: '/',
    handler: createUser,
    schema: {
      tags: ['User'],
      summary: 'Create a user',
      description: 'Create a new user',
      body: createUserBodySchema,
      response: {
        200: createUserResponseSchema,
      },
    },
  })

  return Promise.resolve()
}

export default routes
