import {SubCategory} from "@prisma/client";

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
}
