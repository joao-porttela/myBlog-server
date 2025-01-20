import {Prisma} from "../prisma.client.js";

import {Category} from "@prisma/client";

import {ICategoryRepository} from "../../../struct/interfaces/repo/posts/category-repository.interface.js";

import {CreateCategoryDTO} from "../../../struct/types/dtos/post/create-category.dto.js";
import {UpdateCategoryDTO} from "../../../struct/types/dtos/post/update-category.dto.js";

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: typeof Prisma) {}

  async create(CreateCategory: CreateCategoryDTO): Promise<Category | null> {
    try {
      const categoryDb = await this.prisma.category.create({
        data: {
          name: CreateCategory.name,
          author: {
            connect: {id: CreateCategory.authorId},
          },
        },
      });

      return categoryDb;
    } catch (error) {
      console.log(`CATEGORY REPOSITORY CREATE | ERROR: ${error}`);
      return null;
    }
  }

  async findById(id: string): Promise<Category | null> {
    try {
      const categoryDb = await this.prisma.category.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          posts: true,
          subCategories: true,
        },
      });

      return categoryDb;
    } catch (error) {
      console.error(`CATEGORY REPOSITORY FIND BY ID | ERROR: ${error}`);

      return null;
    }
  }

  async find(category: {name?: string; authorId?: string}): Promise<Category[] | null> {
    try {
      const categoryDb = await this.prisma.category.findMany({
        where: category,
      });

      return categoryDb;
    } catch (error) {
      console.log(`CATEGORY REPOSITORY FIND | ERROR: ${error}`);

      return null;
    }
  }

  async update(id: string, updateCategory: UpdateCategoryDTO): Promise<null> {
    try {
      await this.prisma.category.update({
        data: {
          name: updateCategory.name,
          updatedAt: new Date(),
        },
        where: {
          id,
        },
      });

      return null;
    } catch (error) {
      console.log(`CATEGORY REPOSITORY UPDATE | ERROR: ${error}`);

      return null;
    }
  }

  async delete(id: string): Promise<null> {
    try {
      await this.prisma.category.delete({
        where: {id},
      });

      return null;
    } catch (error) {
      console.log(`CATEGORY REPOSITORY DELETE | ERROR: ${error}`);

      return null;
    }
  }
}

export const categoryRepository = new CategoryRepository(Prisma);
