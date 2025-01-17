import {Category} from "@prisma/client";

import {CreateCategoryDTO} from "../../../types/dtos/post/create-category.dto.js";

export interface ICategoryRepository {
  create(CreateCategory: CreateCategoryDTO): Promise<Category | null>;

  findById(id: string): Promise<Category | null>;

  find(category: {name?: string; authorId?: string}): Promise<Category[] | null>;
}
