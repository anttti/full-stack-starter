import { default as fastifyCreateError } from "fastify-error";

type AppErrorConstructor = fastifyCreateError.FastifyErrorConstructor;
type AppError = fastifyCreateError.FastifyError;

enum ErrorCodes {
  HEALTH_CHECK_FAILED = "HEALTH_CHECK_FAILED",
}

type Errors = {
  [key in ErrorCodes]: AppErrorConstructor;
};

const createError = (
  code: ErrorCodes,
  message: string,
  statusCode?: number
): AppErrorConstructor => fastifyCreateError(code, message, statusCode);

const errors: Errors = {
  /**
   * Health check failure (technicall DB connection failure)
   */
  HEALTH_CHECK_FAILED: createError(ErrorCodes.HEALTH_CHECK_FAILED, "%s", 500),
};

export { errors, ErrorCodes, AppError, AppErrorConstructor };
