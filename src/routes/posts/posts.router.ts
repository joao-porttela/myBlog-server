import {Router} from "express";

// Controller
import {PostController} from "../../03/controllers/post/post.controller.js";

// Types
import {ResponseType} from "../../types/response.type.js";

const postController = new PostController();

const postsRouter: Router = Router();

postsRouter.post("/create-post", async (req, res): Promise<any> => {
  const response: ResponseType = await postController.create(req);

  return res.json(response);
});

export {postsRouter};
