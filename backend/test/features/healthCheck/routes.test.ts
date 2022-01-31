import type { FastifyInstance } from "fastify";

import initApp from "../../../src/core/app";

describe("Health check endpoint", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await initApp();
  });

  it("should respond successfully", async () => {
    const response = await app.inject({
      method: "GET",
      path: "/api/v1/healthcheck",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ ok: true });
  });
});
