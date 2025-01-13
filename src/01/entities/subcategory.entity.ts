import {Category} from "./category.entity.js";
import {ISubCategory} from "../../types/entities/subCategory.type.js";
import {IPost} from "../../types/entities/post.type.js";

export class SubCategory implements ISubCategory {
  constructor(
    public readonly id: string,
    public name: string,
    public category: Category,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
    public posts?: IPost[]
  ) {}
}
