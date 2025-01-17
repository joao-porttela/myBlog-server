import {ICategory} from "./category.type.js";
import {ISubCategory} from "./subCategory.type.js";
import {ITag} from "./tag.type.js";

export type IPost = {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  published: boolean;
  readonly authorId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly tags: ITag[] | null;
  readonly categoryId: ICategory | null;
  readonly subCategoryId: ISubCategory | null;
};
