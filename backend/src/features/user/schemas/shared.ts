import { Codec, string } from "purify-ts";

const User = Codec.interface({
  id: string,
  username: string,
  email: string,
});

export { User };
