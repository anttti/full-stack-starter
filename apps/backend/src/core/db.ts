import { PreparedQuery } from '@pgtyped/query'
import { PoolClient } from 'pg'
import { EitherAsync, Just, Maybe, Nothing } from 'purify-ts'

import { AppError, errors } from './errors'

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

export { one, oneOrNone, many }
