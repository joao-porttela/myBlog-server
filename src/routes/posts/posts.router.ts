import {Router} from "express";

// Controller
import {PostController} from "../../03/controllers/post/post.controller.js";

// Interfaces
import {IPostController} from "../../struct/interfaces/controllers/posts/postController.interface.js";

// Types
import {ResponseType} from "../../struct/types/response.type.js";

const postController: IPostController = new PostController();

const postsRouter: Router = Router();

postsRouter.post("/create", async (req, res): Promise<any> => {
  const response: ResponseType = await postController.create(req);

  return res.json(response);
});

postsRouter.post("/get", async (req, res): Promise<any> => {
  const response: ResponseType = await postController.findById(req);

  return res.json(response);
});

postsRouter.post("/get-user-posts", async (req, res): Promise<any> => {
  const response: ResponseType = await postController.getUserPosts(req);

  return res.json(response);
});

postsRouter.patch("/update", async (req, res): Promise<any> => {
  const response: ResponseType = await postController.update(req);

  return res.json(response);
});

postsRouter.delete("/delete", async (req, res): Promise<any> => {
  const response: ResponseType = await postController.delete(req);

  return res.json(response);
});

export {postsRouter};
