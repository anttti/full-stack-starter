import type { RouteGenericInterface } from 'fastify/types/route'
import { array, GetType } from 'purify-ts'

import { AppError } from '../../../core/errors'
import { User } from './shared'

const Response = array(User)
const responseSchema = Response.schema()
type Response = GetType<typeof Response>

interface Route extends RouteGenericInterface {
  readonly Reply: GetType<typeof Response> | AppError
}

export type { Route }
export { responseSchema }
