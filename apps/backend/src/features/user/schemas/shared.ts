import { Codec, string } from 'purify-ts'

import { enumeration } from '../../../utils/codecs'

enum UserType {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}

// enum Color {
//   RED = 'RED',
//   GREEN = 'GREEN',
//   BLUE = 'BLUE',
// }

const User = Codec.interface({
  id: string,
  username: string,
  email: string,
  userType: enumeration(UserType),
  // favoriteColors: array(enumeration(Color)),
})

export { User }
