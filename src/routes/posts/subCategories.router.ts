import {Router} from "express";

// Controller
import {SubCategoryController} from "../../03/controllers/post/subcategory.controller.js";

// Interfaces
import {ISubCategoryController} from "../../struct/interfaces/controllers/posts/subCategoryController.interface.js";

// Types
import {ResponseType} from "../../struct/types/response.type.js";

const subCategoryController: ISubCategoryController = new SubCategoryController();

const subCategoriesRouter: Router = Router();

subCategoriesRouter.post("/create", async (req, res): Promise<any> => {
  const response: ResponseType = await subCategoryController.create(req);

  return res.json(response);
});

subCategoriesRouter.post("/get-author-sub-categories", async (req, res): Promise<any> => {
  const response: ResponseType = await subCategoryController.findManyByAuthorId(req);

  return res.json(response);
});

subCategoriesRouter.post("/get-sub-category", async (req, res): Promise<any> => {
  const response: ResponseType = await subCategoryController.findById(req);

  return res.json(response);
});

export {subCategoriesRouter};
