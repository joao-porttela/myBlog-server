import {Prisma} from "../prisma.client.js";
import {Category} from "@prisma/client";

import {ICategoryRepository} from "../../../interfaces/repo/posts/category-repository.interface.js";

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: typeof Prisma) {}

  async create() {
    return null;
  }

  async find() {
    return null;
  }
}

export const categoryRepository = new CategoryRepository(Prisma);
