import {Request} from "express";

// Types
import {ResponseType} from "../../../struct/types/response.type.js";

// Repos
import {categoryRepository} from "../../../04/database/repository/category.repository.js";
import {ICategoryRepository} from "../../../struct/interfaces/repo/posts/category-repository.interface.js";

export class CategoryController {
  private readonly categoryRepository: ICategoryRepository = categoryRepository;

  public async create(req: Request): Promise<ResponseType> {
    try {
      if (!req.body.name) throw new Error("Category name required");

      if (!req.body.authorId) throw new Error("Category author ID required");

      const category: {
        name: string;
        authorId: string;
      } = {
        name: req.body.name,
        authorId: req.body.authorId,
      };

      const categoryDb = await this.categoryRepository.create(category);

      if (!categoryDb) throw new Error();

      return {
        statusCode: 200,
        status: "Success",
        message: categoryDb,
        error: false,
      };
    } catch (error) {
      console.log(`CATEGORY CONTROLLER CREATE | ERROR: ${error}`);
      return {
        statusCode: 500,
        status: "Fail",
        message: error,
        error: true,
      };
    }
  }

  public async findManyByAuthorId(req: Request): Promise<ResponseType> {
    try {
      if (!req.body.authorId) throw new Error("Author ID required");

      const category: {authorId: string} = {
        authorId: req.body.authorId,
      };

      const categoriesDb = await this.categoryRepository.find(category);

      return {
        statusCode: 200,
        status: "Success",
        message: categoriesDb,
        error: false,
      };
    } catch (error) {
      console.log(`CATEGORY CONTROLLER FIND | ERROR: ${error}`);

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
      if (!req.body.id) throw new Error("Category ID required");

      const category: {id: string} = {id: req.body.id};

      const categoryDb = await this.categoryRepository.findById(category.id);

      return {
        statusCode: 200,
        status: "Success",
        message: categoryDb,
        error: false,
      };
    } catch (error) {
      console.log(`CATEGORY CONTROLLER FIND BY ID | ERROR: ${error}`);

      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal Server Error",
        error: true,
      };
    }
  }
}
