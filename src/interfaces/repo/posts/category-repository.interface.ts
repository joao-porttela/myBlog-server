import {Category} from "@prisma/client";

export interface ICategoryRepository {
  create(): Promise<Category | null>;
  find(): Promise<Category | null>;
}
