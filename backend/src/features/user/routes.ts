import type { FastifyPluginAsync } from "fastify";

import { createUser, getUserById, getUsers } from "./handlers";
import {
  Route as GetUsersRoute,
  responseSchema as getUsersResponseSchema,
} from "./schemas/getUsers";
import {
  Route as GetUserByIdRoute,
  responseSchema as getUserByIdResponseSchema,
  paramsSchema as getUserByIdParamsSchema,
} from "./schemas/getUserById";
import {
  Route as CreateUserRoute,
  responseSchema as createUserResponseSchema,
  bodySchema as createUserBodySchema,
} from "./schemas/createUser";

const routes: FastifyPluginAsync = (instance) => {
  /**
   * @api {GET} / Get all users
   * @apiName GetUsers
   * @apiGroup GetUsers
   * @apiVersion 1.0.0
   *
   * @apiSuccess (200) {GetUsersResponse} Static response indicating success
   */
  instance.route<GetUsersRoute>({
    method: "GET",
    url: "/",
    handler: getUsers,
    schema: {
      response: {
        200: getUsersResponseSchema,
      },
    },
  });

  /**
   * @api {GET} /:userId Get user by ID
   * @apiName GetUserById
   * @apiGroup GetUserById
   * @apiVersion 1.0.0
   *
   * @apiSuccess (200) {GetUsersResponse} Static response indicating success
   */
  instance.route<GetUserByIdRoute>({
    method: "GET",
    url: "/:userId",
    handler: getUserById,
    schema: {
      params: getUserByIdParamsSchema,
      response: {
        200: getUserByIdResponseSchema,
      },
    },
  });

  /**
   * @api {POST} / Create a user
   * @apiName CreateUser
   * @apiGroup CreateUser
   * @apiVersion 1.0.0
   *
   * @apiSuccess (200) {GetUsersResponse} Static response indicating success
   */
  instance.route<CreateUserRoute>({
    method: "POST",
    url: "/",
    handler: createUser,
    schema: {
      body: createUserBodySchema,
      response: {
        200: createUserResponseSchema,
      },
    },
  });

  return Promise.resolve();
};

export default routes;
