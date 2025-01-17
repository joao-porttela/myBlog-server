import {Router} from "express";

// Controller
import {CategoryController} from "../../03/controllers/post/category.controller.js";

// Interfaces
import {ICategoryController} from "../../struct/interfaces/controllers/posts/categoryController.interface.js";

// Types
import {ResponseType} from "../../struct/types/response.type.js";

const categoryController: ICategoryController = new CategoryController();

const categoriesRouter: Router = Router();

categoriesRouter.post("/create", async (req, res): Promise<any> => {
  const response: ResponseType = await categoryController.create(req);

  return res.json(response);
});

categoriesRouter.post("/get-author-categories", async (req, res): Promise<any> => {
  const response: ResponseType = await categoryController.findManyByAuthorId(req);

  return res.json(response);
});

categoriesRouter.post("/get-category", async (req, res): Promise<any> => {
  const response: ResponseType = await categoryController.findById(req);

  return res.json(response);
});

export {categoriesRouter};
