import {SubCategory} from "@prisma/client";

export interface ISubCategoryRepository {
  create(): Promise<SubCategory | null>;
  find(): Promise<SubCategory | null>;
}
