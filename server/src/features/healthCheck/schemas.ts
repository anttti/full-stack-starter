import { boolean, Codec, GetType } from "purify-ts";
import type { RouteGenericInterface } from "fastify/types/route";

import { AppError } from "../../core/errors";

const healthCheckResponse = Codec.interface({
  ok: boolean,
});

export const healthCheckResponseSchema = healthCheckResponse.schema();

export type HealthCheckResponse = GetType<typeof healthCheckResponse>;

export interface HealthCheckRoute extends RouteGenericInterface {
  readonly Reply: HealthCheckResponse | AppError;
}
