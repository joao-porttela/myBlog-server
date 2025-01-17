import {IPost} from "./post.type.js";
import {ISubCategory} from "./subCategory.type.js";

export type ICategory = {
  readonly id: string;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  subCategory?: ISubCategory[];
  posts?: IPost[];
};
