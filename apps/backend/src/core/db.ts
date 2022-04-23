import { PreparedQuery } from '@pgtyped/query'
import type { PostgresDb } from 'fastify-postgres'
import { PoolClient } from 'pg'
import { EitherAsync, Just, Maybe, Nothing, Left, Right } from 'purify-ts'

import { AppError, errors } from './errors'

/**
 * A wrapper helper function for accessing the DB without having to worry about
 * forgetting to release the client back to the pool
 * @param postgres fastify-postgres handle to PG
 * @param fn The callback function to run using the DB client
 */
const withDb =
  (postgres: PostgresDb & Record<string, PostgresDb>) =>
  async (fn: (db: PoolClient) => Promise<unknown>) => {
    const client = await postgres.connect()
    await fn(client)
    client.release()
  }

/**
 * A wrapper helper function for running DB queries in a transaction. Closes the
 * client after the operation is done.
 * @param postgres fastify-postgres handle to PG
 * @param fn The callback function to run using the DB client
 */
const inTransaction = <L, R>(
  postgres: PostgresDb & Record<string, PostgresDb>,
  fn: (db: PoolClient) => EitherAsync<L, R>
) =>
  EitherAsync.fromPromise(() =>
    postgres
      .transact(async (client) =>
        fn(client).caseOf({
          Left: (e) => Promise.reject(e),
          Right: (recipe) => Promise.resolve(recipe),
        })
      )
      .then(Right)
      .catch((reason: L) => Left(reason))
  )

/**
 * Perform a db query expecting exactly one result. Returns a Left if != 1 rows are returned
 * @param client Pg client
 * @param queryFn A pgtyped PreparedQuery function
 * @param params Parameters for the query
 * @returns The successful result or an error wrapped in an EitherAsync
 */
const one = <ParamsType, ReturnType>(
  client: PoolClient,
  queryFn: PreparedQuery<ParamsType, ReturnType>,
  params: ParamsType
): EitherAsync<AppError, ReturnType> =>
  EitherAsync(async ({ throwE }) => {
    // eslint-disable-next-line fp/no-let
    let res = []
    try {
      // eslint-disable-next-line fp/no-mutation
      res = await queryFn.run(params, client)
      if (res.length === 1) {
        return res[0]
      }
    } catch {
      throwE(new errors.GENERIC_DB_QUERY_FAILED())
    }
    if (res.length === 0) {
      return throwE(new errors.ONE_RETURNED_NONE())
    }
    return throwE(new errors.ONE_RETURNED_MANY())
  })

/**
 * Perform a db query expecting one or zero results. On a successful DB query, if there are one or
 * zero results, returns the result wrapped in a Maybe, otherwise returns an error
 * @param client Pg client
 * @param queryFn A pgtyped PreparedQuery function
 * @param params Parameters for the query
 * @returns The successful result or an error wrapped in an EitherAsync
 */
const oneOrNone = <ParamsType, ReturnType>(
  client: PoolClient,
  query: PreparedQuery<ParamsType, ReturnType>,
  params: ParamsType
): EitherAsync<AppError, Maybe<ReturnType>> =>
  EitherAsync(async ({ throwE }) => {
    try {
      const res = await query.run(params, client)
      if (res.length === 1) {
        return Just(res[0])
      }
      if (res.length > 1) {
        throwE(new errors.ONE_RETURNED_MANY())
      }
    } catch {
      throwE(new errors.GENERIC_DB_QUERY_FAILED())
    }
    return Nothing
  })

/**
 * Perform a db query expecting zero or more results.
 * @param client Pg client
 * @param queryFn A pgtyped PreparedQuery function
 * @param params Parameters for the query
 * @returns The successful result or an error wrapped in an EitherAsync
 */
const many = <ParamsType, ReturnType>(
  client: PoolClient,
  query: PreparedQuery<ParamsType, ReturnType>,
  params: ParamsType
): EitherAsync<AppError, ReturnType[]> =>
  EitherAsync(async ({ throwE }) => {
    try {
      const res = await query.run(params, client)
      return res
    } catch {
      throwE(new errors.GENERIC_DB_QUERY_FAILED())
    }
    return []
  })

export { withDb, inTransaction, one, oneOrNone, many }
