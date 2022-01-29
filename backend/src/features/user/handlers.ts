import type { RouteHandler } from "fastify";

import { Route as GetUsersRoute } from "./schemas/getUsers";
import { Route as GetUserByIdRoute } from "./schemas/getUserById";
import { Route as CreateUserRoute } from "./schemas/createUser";
import { findUserById, insertUser, listAllUsers } from "./user.queries";
import { errors } from "../../core/errors";
import { oneOrNone, many } from "../../core/db";

/**
 * Get all users endpoint
 */
export const getUsers: RouteHandler<GetUsersRoute> = async (req, res) => {
  const client = await req.server.pg.connect();
  const users = many(client, listAllUsers, undefined);
  return users.caseOf({
    Left: (e) => res.send(e),
    Right: (users) => res.send(users),
  });
};

/**
 * Get a single user endpoint
 */
export const getUserById: RouteHandler<GetUserByIdRoute> = async (req, res) => {
  const client = await req.server.pg.connect();
  const user = oneOrNone(client, findUserById, { userId: req.params.userId });
  return user.caseOf({
    Left: (e) => res.send(e),
    Right: (maybeUser) =>
      maybeUser.caseOf({
        Nothing: () =>
          res.send(
            new errors.USER_NOT_FOUND(`No user for id ${req.params.userId}`)
          ),
        Just: (user) => res.send(user),
      }),
  });
};

/**
 * Create a user endpoint
 */
export const createUser: RouteHandler<CreateUserRoute> = async (req, res) => {
  const client = await req.server.pg.connect();
  const id = await insertUser.run({ user: req.body }, client);
  return res.send(id[0]);
};
