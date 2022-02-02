import { Codec, GetType, string } from 'purify-ts'
import type { RouteGenericInterface } from 'fastify/types/route'

import { AppError } from '../../../core/errors'
import { User } from './shared'

const Response = User
const responseSchema = Response.schema()

const Params = Codec.interface({
  userId: string,
})
const paramsSchema = Params.schema()

interface Route extends RouteGenericInterface {
  readonly Reply: GetType<typeof Response> | AppError
  readonly Params: GetType<typeof Params>
}

export type { Route }
export { responseSchema, paramsSchema }
