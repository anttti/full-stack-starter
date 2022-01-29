import type { RouteHandler } from "fastify";

import { Route as CreatePostRoute } from "./schemas/createPost";
import { insertPost } from "./post.queries";

/**
 * Create a post endpoint
 */
export const createPost: RouteHandler<CreatePostRoute> = async (req, res) => {
  const client = await req.server.pg.connect();
  const id = await insertPost.run({ post: req.body }, client);
  return res.send(id[0]);
};
