import type { RouteGenericInterface } from 'fastify/types/route'
import { array, GetType } from 'purify-ts'
import { UserCodec } from '@full-stack-starter/codecs'

import { AppError } from '../../../core/errors'

const Response = array(UserCodec)
const responseSchema = Response.schema()
type Response = GetType<typeof Response>

interface Route extends RouteGenericInterface {
  readonly Reply: GetType<typeof Response> | AppError
}

export type { Route }
export { responseSchema }
