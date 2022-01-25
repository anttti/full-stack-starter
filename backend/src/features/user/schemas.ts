import { array, Codec, GetType, nullable, string } from "purify-ts";
import type { RouteGenericInterface } from "fastify/types/route";
import { User } from "@prisma/client";

import { AppError } from "../../core/errors";

// TODO: Figure out if it is possible to generate these from Prisma schema
// https://github.com/valentinpalkovic/prisma-json-schema-generator
const GetUsersResponse = array(
  Codec.interface({
    id: string,
    name: nullable(string),
    email: string,
  })
);

export const getUsersResponseSchema = GetUsersResponse.schema();

export type GetUsersResponse = GetType<typeof GetUsersResponse>;

export interface GetUsersRoute extends RouteGenericInterface {
  readonly Reply: User[] | AppError;
}
