import { default as fastifyCreateError } from "fastify-error";

type AppErrorConstructor = fastifyCreateError.FastifyErrorConstructor;
type AppError = fastifyCreateError.FastifyError;

enum ErrorCodes {
  GENERIC_DB_QUERY_FAILED = "GENERIC_DB_QUERY_FAILED",
  HEALTH_CHECK_FAILED = "HEALTH_CHECK_FAILED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
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
  GENERIC_DB_QUERY_FAILED: createError(
    ErrorCodes.GENERIC_DB_QUERY_FAILED,
    "%s",
    500
  ),
  HEALTH_CHECK_FAILED: createError(ErrorCodes.HEALTH_CHECK_FAILED, "%s", 500),
  USER_NOT_FOUND: createError(ErrorCodes.USER_NOT_FOUND, "%s", 404),
};

export { errors, ErrorCodes, AppError, AppErrorConstructor };
