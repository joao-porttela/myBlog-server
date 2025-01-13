import {ICategory} from "./category.type.js";
import {IPost} from "./post.type.js";

export type ISubCategory = {
  readonly id: string;
  name: string;
  category: ICategory;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  posts?: IPost[];
};
