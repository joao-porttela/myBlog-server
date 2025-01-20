import {SubCategory} from "@prisma/client";

import {UpdateSubCategoryDTO} from "../../../types/dtos/post/update-sub-category.dto.js";

export interface ISubCategoryRepository {
  create(createSubCategory: {
    name: string;
    authorId: string;
    categoryId: string;
  }): Promise<SubCategory | null>;

  findById(id: string): Promise<SubCategory | null>;

  find(subCategory: {
    authorId?: string;
    categoryId?: string;
  }): Promise<SubCategory[] | null>;

  update(id: string, updateSubCategory: UpdateSubCategoryDTO): Promise<null>;

  delete(id: string): Promise<null>;
}
