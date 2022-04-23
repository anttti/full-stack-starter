import { Codec, GetType, string } from 'purify-ts'
import type { RouteGenericInterface } from 'fastify/types/route'
import { UserSchema } from '@full-stack-starter/codecs'
import type { User } from '@full-stack-starter/codecs'

import { AppError } from '../../../core/errors'

const Params = Codec.interface({
  userId: string,
})
const paramsSchema = Params.schema()

interface Route extends RouteGenericInterface {
  readonly Reply: User | AppError
  readonly Params: GetType<typeof Params>
}

export type { Route }
export { UserSchema as responseSchema, paramsSchema }
