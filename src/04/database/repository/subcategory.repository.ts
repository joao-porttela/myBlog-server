import {Prisma, SubCategory} from "@prisma/client";

import {ISubCategoryRepository} from "../../../interfaces/repo/posts/subCategory-repository.interface.js";

export class SubCategoryRepository implements ISubCategoryRepository {
  constructor(private readonly prisma: typeof Prisma) {}

  async create(): Promise<SubCategory | null> {
    return null;
  }

  async find(): Promise<SubCategory | null> {
    return null;
  }
}

export const subCategoryRepository = new SubCategoryRepository(Prisma);
