import { Codec, GetType, string } from 'purify-ts'
import type { RouteGenericInterface } from 'fastify/types/route'

import { AppError } from '../../../core/errors'

const Body = Codec.interface({
  username: string,
  email: string,
})
const bodySchema = Body.schema()

const Response = Codec.interface({
  userId: string,
})
const responseSchema = Response.schema()

interface Route extends RouteGenericInterface {
  readonly Reply: GetType<typeof Response> | AppError
  readonly Body: GetType<typeof Body>
}

export type { Route }
export { responseSchema, bodySchema }
