import {IPost} from "../../types/entities/post.type.js";
import {ICategory} from "../../types/entities/category.type.js";
import {ISubCategory} from "../../types/entities/subCategory.type.js";

export class Category implements ICategory {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
    public subCategory?: ISubCategory[],
    public posts?: IPost[]
  ) {}
}
