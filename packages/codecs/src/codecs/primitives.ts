import { Codec, enumeration as purifyEnum, Right, string } from 'purify-ts'
import { RegExpMatchedString } from 'purify-ts-extra-codec'

const enumeration = <T extends Record<string, string> | ArrayLike<string>>(e: T): Codec<string> =>
  Codec.custom<string>({
    decode: purifyEnum(e as Record<string, string>).decode,
    encode: string.encode,
    schema: () => ({
      type: 'string',
      enum: Object.values(e),
    }),
  })

const numericDecode =
  <T>(codec: Codec<T>) =>
  (input: unknown) => {
    if (typeof input === 'number' && !isNaN(input)) {
      return Right(String(input))
    }
    return codec.decode(input)
  }

const numStr = RegExpMatchedString('^[0-9]+$')

const numericString = Codec.custom<string>({
  decode: numericDecode(numStr),
  encode: numStr.encode,
  schema: numStr.schema,
})

export { enumeration, numericString, numericString as foreignKey, numericString as primaryKey }
