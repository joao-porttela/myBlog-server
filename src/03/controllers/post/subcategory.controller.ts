import {Request} from "express";

// Repos
import {subCategoryRepository} from "../../../04/database/repository/subcategory.repository.js";

// Interfaces
import {ISubCategoryRepository} from "../../../struct/interfaces/repo/posts/subCategory-repository.interface.js";
import {ISubCategoryController} from "../../../struct/interfaces/controllers/posts/subCategoryController.interface.js";

// Types
import {ResponseType} from "../../../struct/types/response.type.js";

export class SubCategoryController implements ISubCategoryController {
  private readonly subCategoryRepository: ISubCategoryRepository = subCategoryRepository;

  public async create(req: Request): Promise<ResponseType> {
    try {
      const subCategory: {
        name: string;
        authorId: string;
        categoryId: string;
      } = {
        name: req.body.name,
        authorId: req.body.authorId,
        categoryId: req.body.categoryId,
      };

      const subCategoryDb = await this.subCategoryRepository.create(subCategory);

      if (!subCategoryDb) throw new Error();

      return {
        statusCode: 200,
        status: "Success",
        message: subCategoryDb,
        error: false,
      };
    } catch (error) {
      console.error(`SUB CATEGORY CONTROLLER | CREATE ERROR: ${error}`);

      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal Server Error",
        error: true,
      };
    }
  }

  public async findManyByAuthorId(req: Request): Promise<ResponseType> {
    try {
      const subCategory = {
        authorId: req.body.authorId,
        categoryId: req.body.categoryId,
      };

      const subCategoriesDb = await this.subCategoryRepository.find(subCategory);

      if (!subCategoriesDb) throw new Error();

      return {
        statusCode: 200,
        status: "Success",
        message: subCategoriesDb,
        error: false,
      };
    } catch (error) {
      console.error(`SUB CATEGORY CONTROLLER | FIND MANY BY AUTHOR ID ERROR: ${error}`);

      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal Server Error",
        error: true,
      };
    }
  }

  public async findById(req: Request): Promise<ResponseType> {
    try {
      if (!req.body.id) throw new Error("Sub Category ID required");

      const subCategory: {id: string} = {
        id: req.body.id,
      };

      const subCategoryDb = await this.subCategoryRepository.findById(subCategory.id);

      return {
        statusCode: 200,
        status: "Success",
        message: subCategoryDb,
        error: false,
      };
    } catch (error) {
      console.error(`SUB CATEGORY CONTROLLER FIND BY ID | ERROR: ${error}`);

      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal Server Error",
        error: true,
      };
    }
  }

  public async update(req: Request): Promise<ResponseType> {
    try {
      if (!req.body.id || !req.body.subCategory) throw new Error();

      await this.subCategoryRepository.update(req.body.id, req.body.subCategory);

      return {
        statusCode: 200,
        status: "Success",
        message: "Sub Category updated successfully",
        error: false,
      };
    } catch (error) {
      console.error(`SUB CATEGORY CONTROLLER | DELETE ERROR: ${error}`);

      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal Server Error",
        error: true,
      };
    }
  }

  public async delete(req: Request): Promise<ResponseType> {
    try {
      if (!req.body.id) throw new Error();
      await this.subCategoryRepository.delete(req.body.id);

      return {
        statusCode: 200,
        status: "Success",
        message: "Sub Category delete successfully",
        error: false,
      };
    } catch (error) {
      console.error(`SUB CATEGORY CONTROLLER | DELETE ERROR: ${error}`);

      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal Server Error",
        error: true,
      };
    }
  }
}
