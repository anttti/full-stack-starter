import { boolean, Codec, GetType } from "purify-ts";
import type { RouteGenericInterface } from "fastify/types/route";

import { AppError } from "../../core/errors";

const HealthCheckResponse = Codec.interface({
  ok: boolean,
});

export const healthCheckResponseSchema = HealthCheckResponse.schema();

export type HealthCheckResponse = GetType<typeof HealthCheckResponse>;

export interface HealthCheckRoute extends RouteGenericInterface {
  readonly Reply: HealthCheckResponse | AppError;
}
