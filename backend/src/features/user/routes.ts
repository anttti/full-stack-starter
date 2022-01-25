import type { FastifyPluginAsync } from "fastify";

import { getUsers } from "./handlers";
import { getUsersResponseSchema, GetUsersRoute } from "./schemas";

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
    config: {
      secure: false,
    },
    schema: {
      response: {
        200: getUsersResponseSchema,
      },
    },
  });

  return Promise.resolve();
};

export default routes;
