import type { RouteHandler } from "fastify";

import { Route as GetUsersRoute } from "./schemas/getUsers";
import { Route as GetUserByIdRoute } from "./schemas/getUserById";
import { Route as CreateUserRoute } from "./schemas/createUser";
import { findUserById, insertUser, listAllUsers } from "./queries.queries";

/**
 * Get all users endpoint
 */
export const getUsers: RouteHandler<GetUsersRoute> = async (req, res) => {
  const client = await req.server.pg.connect();
  const users = await listAllUsers.run(undefined, client);
  return res.send(users);
};

/**
 * Get a single user endpoint
 */
export const getUserById: RouteHandler<GetUserByIdRoute> = async (req, res) => {
  const client = await req.server.pg.connect();
  const users = await findUserById.run({ userId: req.params.userId }, client);
  return res.send(users[0]);
};

/**
 * Create a user endpoint
 */
export const createUser: RouteHandler<CreateUserRoute> = async (req, res) => {
  const client = await req.server.pg.connect();
  const id = await insertUser.run({ user: req.body }, client);
  return res.send(id[0]);
};
