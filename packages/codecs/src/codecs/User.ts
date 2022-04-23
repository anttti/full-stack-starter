import type { GetType } from 'purify-ts'
import { string } from 'purify-ts'
import { Interface } from 'purify-ts-extra-codec'

import { enumeration, primaryKey } from './primitives'

enum UserType {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}

const UserCodec = Interface({
  userId: primaryKey,
  username: string,
  email: string,
  userType: enumeration(UserType),
})
const UserSchema = UserCodec.schema()
type User = GetType<typeof UserCodec>

export { UserCodec, UserSchema }

export type { User }
