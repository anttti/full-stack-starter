import type { RouteHandler } from "fastify";
import { PreparedQuery } from "@pgtyped/query";
import { PoolClient } from "pg";
import { EitherAsync, Just, Maybe, Nothing } from "purify-ts";

import { Route as GetUsersRoute } from "./schemas/getUsers";
import { Route as GetUserByIdRoute } from "./schemas/getUserById";
import { Route as CreateUserRoute } from "./schemas/createUser";
import { findUserById, insertUser, listAllUsers } from "./user.queries";
import { AppError, errors } from "../../core/errors";

const one = <ParamsType, ReturnType>(
  client: PoolClient,
  query: PreparedQuery<ParamsType, ReturnType>,
  params: ParamsType
): EitherAsync<AppError, Maybe<ReturnType>> =>
  EitherAsync(async ({ throwE }) => {
    try {
      const res = await query.run(params, client);
      if (res.length === 1) {
        return Just(res[0]);
      }
    } catch {
      throwE(new errors.GENERIC_DB_QUERY_FAILED());
    }
    return Nothing;
  });

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

  const user = one(client, findUserById, { userId: req.params.userId });
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
