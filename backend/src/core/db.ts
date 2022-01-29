import { PreparedQuery } from "@pgtyped/query";
import { PoolClient } from "pg";
import { EitherAsync, Just, Maybe, Nothing } from "purify-ts";

import { AppError, errors } from "./errors";

const one = <ParamsType, ReturnType>(
  client: PoolClient,
  query: PreparedQuery<ParamsType, ReturnType>,
  params: ParamsType
): EitherAsync<AppError, ReturnType> =>
  EitherAsync(async ({ throwE }) => {
    try {
      const res = await query.run(params, client);
      if (res.length === 1) {
        return res[0];
      }
    } catch {
      throwE(new errors.GENERIC_DB_QUERY_FAILED());
    }
    return throwE(new errors.ONE_RETURNED_NONE_OR_MANY());
  });

const oneOrNone = <ParamsType, ReturnType>(
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

const many = <ParamsType, ReturnType>(
  client: PoolClient,
  query: PreparedQuery<ParamsType, ReturnType>,
  params: ParamsType
): EitherAsync<AppError, ReturnType[]> =>
  EitherAsync(async ({ throwE }) => {
    try {
      const res = await query.run(params, client);
      return res;
    } catch {
      throwE(new errors.GENERIC_DB_QUERY_FAILED());
    }
    return [];
  });

export { one, oneOrNone, many };
