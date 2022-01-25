import type { RouteHandler } from "fastify";

import { GetUsersRoute } from "./schemas";

/**
 * Get all users endpoint
 */
export const getUsers: RouteHandler<GetUsersRoute> = async (req, res) => {
  const users = await req.server.prisma.user.findMany();
  console.log(JSON.stringify(users, null, 2));
  return res.send(users);
};
