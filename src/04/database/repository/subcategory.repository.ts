import {Prisma} from "../prisma.client.js";
import {SubCategory} from "@prisma/client";

import {ISubCategoryRepository} from "../../../struct/interfaces/repo/posts/subCategory-repository.interface.js";

export class SubCategoryRepository implements ISubCategoryRepository {
  constructor(private readonly prisma: typeof Prisma) {}

  async create(createSubCategory: {
    name: string;
    authorId: string;
    categoryId: string;
  }): Promise<SubCategory | null> {
    try {
      const subCategoryDb = await this.prisma.subCategory.create({
        data: {
          name: createSubCategory.name,
          author: {connect: {id: createSubCategory.authorId}},
          category: {connect: {id: createSubCategory.categoryId}},
        },
      });

      return subCategoryDb;
    } catch (error) {
      console.error(`SUB CATEGORY CREATE | ERROR: ${error}`);

      return null;
    }
  }

  async findById(id: string): Promise<SubCategory | null> {
    try {
      const subCategoryDb = await this.prisma.subCategory.findUnique({
        where: {id},
        include: {
          posts: true,
          category: true,
        },
      });

      return subCategoryDb;
    } catch (error) {
      console.error(`SUB CATEGORY FIND BY ID | ERROR: ${error}`);

      return null;
    }
  }

  async find(subCategory: {
    authorId?: string;
    categoryId?: string;
  }): Promise<SubCategory[] | null> {
    try {
      const subCategoryDb = await this.prisma.subCategory.findMany({
        where: subCategory,
      });

      return subCategoryDb;
    } catch (error) {
      console.error(`SUB CATEGORY | ERROR: ${error}`);

      return null;
    }
  }
}

export const subCategoryRepository = new SubCategoryRepository(Prisma);
