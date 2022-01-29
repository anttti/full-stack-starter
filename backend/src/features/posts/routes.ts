import type { FastifyPluginAsync } from "fastify";

import { createPost } from "./handlers";
import {
  Route as CreatePostRoute,
  responseSchema as createPostResponseSchema,
  bodySchema as createPostBodySchema,
} from "./schemas/createPost";

const routes: FastifyPluginAsync = (instance) => {
  /**
   * @api {POST} / Create a post
   * @apiName CreatePost
   * @apiGroup CreatePost
   * @apiVersion 1.0.0
   *
   * @apiSuccess (201) {CreatePostResponse} The ID of the created post
   */
  instance.route<CreatePostRoute>({
    method: "POST",
    url: "/",
    handler: createPost,
    schema: {
      body: createPostBodySchema,
      response: {
        200: createPostResponseSchema,
      },
    },
  });

  return Promise.resolve();
};

export default routes;
