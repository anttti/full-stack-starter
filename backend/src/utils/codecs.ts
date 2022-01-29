import { Codec, enumeration as purifyEnum, string } from "purify-ts";

const enumeration = <T extends Record<string, string> | ArrayLike<string>>(
  e: T
): Codec<string> =>
  Codec.custom<string>({
    decode: purifyEnum(e as Record<string, string>).decode,
    encode: string.encode,
    schema: () => ({
      type: "string",
      enum: Object.values(e),
    }),
  });

export { enumeration };
