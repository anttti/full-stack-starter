import { default as fastifyCreateError } from "fastify-error";

type AppErrorConstructor = fastifyCreateError.FastifyErrorConstructor;
type AppError = fastifyCreateError.FastifyError;

enum ErrorCodes {
  GENERIC_DB_QUERY_FAILED = "GENERIC_DB_QUERY_FAILED",
  ONE_RETURNED_NONE = "ONE_RETURNED_NONE",
  ONE_RETURNED_MANY = "ONE_RETURNED_MANY",
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
  ONE_RETURNED_NONE: createError(
    ErrorCodes.ONE_RETURNED_NONE,
    "DB query expected exactly one result row, but got 0 rows",
    500
  ),
  ONE_RETURNED_MANY: createError(
    ErrorCodes.ONE_RETURNED_MANY,
    "DB query expected exactly one result row, but got more than 1 row",
    500
  ),
  HEALTH_CHECK_FAILED: createError(ErrorCodes.HEALTH_CHECK_FAILED, "%s", 500),
  USER_NOT_FOUND: createError(ErrorCodes.USER_NOT_FOUND, "%s", 404),
};

export { errors, ErrorCodes, AppError, AppErrorConstructor };
